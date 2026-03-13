import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

export async function handler() {
  try {
    // --- Fetch pending jobs ---
    const { data: tasks, error } = await supabase
      .from("email_queue")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: true })
      .limit(5);

    if (error) throw error;

    if (!tasks?.length) {
      return { statusCode: 200, body: JSON.stringify({ ok: true, processed: 0 }) };
    }

    for (const job of tasks) {
      // Mark job as processing
      await supabase.from("email_queue")
        .update({ status: "processing", updated_at: new Date() })
        .eq("id", job.id);

      let providerId = null;
      let errorMsg = null;

      try {
        const res = await resend.emails.send({
          from: "Flowwed <hello@flowwed.com>",
          to: job.email,
          subject: job.subject,
          html: job.html
        });

        // --- CRITICAL FIX: MUST verify ID ---
        if (!res || !res.data || !res.data.id) {
          throw new Error("Resend did NOT return a message ID");
        }

        providerId = res.data.id;

        // Mark success
        await supabase.from("email_queue")
          .update({
            status: "sent",
            provider_id: providerId,
            error_message: null,
            attempts: (job.attempts || 0) + 1,
            updated_at: new Date()
          })
          .eq("id", job.id);

        continue;

      } catch (err) {
        errorMsg = err.message;
        console.log("SEND ERROR:", job.email, errorMsg);
      }

      // --- Failed logic ---
      const attempts = (job.attempts || 0) + 1;
      const finalStatus = attempts >= 3 ? "failed" : "pending";

      await supabase.from("email_queue")
        .update({
          status: finalStatus,
          error_message: errorMsg,
          provider_id: null,
          attempts,
          updated_at: new Date()
        })
        .eq("id", job.id);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, processed: tasks.length })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
