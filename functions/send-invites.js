const { Resend } = require("resend");
const { createClient } = require("@supabase/supabase-js");

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const { guests, subject, html, token: websiteId, attachment } = body;

    if (!Array.isArray(guests) || !guests.length) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Guests array required" })
      };
    }

    const results = [];

    for (const g of guests) {
      const email = g.email?.trim();
      if (!email) continue;

      console.log("Sending email to:", email);

      let guestToken = null;
      try {
        const url = new URL(g.rsvpUrl);
        guestToken = url.searchParams.get("guest") || null;
      } catch {}

      try {
        const emailPayload = {
          from: "Flowwed <hello@flowwed.com>",
          to: email,
          subject,
          html
        };

        if (attachment?.content) {
          emailPayload.attachments = [
            {
              filename: attachment.filename,
              content: attachment.content,
              type: attachment.type || "application/octet-stream",
              disposition: "attachment"
            }
          ];
        }

        const res = await resend.emails.send(emailPayload);

        console.log("Resend response:", res);

        await supabase.from("email_logs").insert({
          website_id: websiteId,
          email,
          subject,
          success: true,
          resend_id: res.data?.id || null,
          token: guestToken
        });

        results.push({ email, ok: true });

      } catch (err) {
        console.error("Send error:", err);

        await supabase.from("email_logs").insert({
          website_id: websiteId,
          email,
          subject,
          success: false,
          error_message: err.message || "send_error",
          token: guestToken
        });

        results.push({ email, ok: false, error: err.message });
      }
    }

    const failed = results.filter(r => !r.ok).length;

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: failed === 0,
        sent: results.length - failed,
        failed,
        results
      })
    };

  } catch (e) {
    console.error("Fatal error:", e);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};