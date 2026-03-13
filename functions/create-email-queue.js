import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

export async function handler(event) {
  try {
    const body = JSON.parse(event.body || "{}");
    const { guests, subject, html } = body;

    if (!Array.isArray(guests) || guests.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Guests array required" })
      };
    }

    const rows = guests.map(g => ({
      guest_id: g.id,
      email: g.email,
      token: g.token,
      subject,
      html,
      status: "pending",
      attempts: 0
    }));

    const { error } = await supabase.from("email_queue").insert(rows);
    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, queued: guests.length })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
