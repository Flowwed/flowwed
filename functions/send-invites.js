const { Resend } = require("resend");
const { createClient } = require("@supabase/supabase-js");
const validate = require("deep-email-validator");

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

// -------------------------------
// Email validation helper
// -------------------------------
async function isEmailValid(email) {
  try {
    const result = await validate({
      email,
      validateRegex: true,        // формат
      validateMx: true,           // MX записи
      validateTypo: true,         // gmail.con → gmail.com
      validateDisposable: true,   // временные/фейковые email
      validateSMTP: false         // оставляем выключенным (быстрее, меньше ошибок)
    });

    return result; // { valid, reason, validators }
  } catch (e) {
    return { valid: false, reason: "validator_error" };
  }
}

exports.handler = async (event, context) => {

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

      // ----------------------------------------
      // 1) VALIDATE EMAIL BEFORE SENDING
      // ----------------------------------------
      const validation = await isEmailValid(email);

      if (!validation.valid) {
        await supabase.from("email_logs").insert({
          website_id: websiteId,
          email,
          subject,
          success: false,
          error_message: validation.reason || "invalid_email",
          token: null
        });

        results.push({
          email,
          ok: false,
          error: "Invalid email: " + validation.reason
        });

        continue; // SKIP SENDING
      }

      // ----------------------------------------
      // Extract guest-token from RSVP URL
      // ----------------------------------------
      let guestToken = null;
      try {
        const url = new URL(g.rsvpUrl);
        guestToken = url.searchParams.get("guest") || null;
      } catch {}

      try {
        // ----------------------------------------
        // 2) SEND EMAIL
        // ----------------------------------------
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


        await supabase.from("email_logs").insert({
          website_id: websiteId,
          email,
          subject,
          success: true,
          resend_id: res.data?.id || null,
          token: guestToken
        });

        results.push({ email, ok: true, resend_id: res.data?.id });

        await new Promise(r => setTimeout(r, 1500)); // rate limit

      } catch (err) {
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
    ok: failed === 0,   // ← вот настоящая проверка
    sent: results.length - failed,
    failed,
    results
  })
};


  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
}
