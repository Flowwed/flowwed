export async function handler(event) {
  const SUPABASE_URL = "https://octwwpatppbenqwkcqaw.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jdHd3cGF0cHBiZW5xd2tjcWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NjYxMjYsImV4cCI6MjA3NDU0MjEyNn0.kYX1yCkx3Zl2J_qLHZYcknLnx_aXl26zB--__MzkknI";

  try {
    const { slug, token, filename, slot, page_key } =
      JSON.parse(event.body || "{}");

    if (!slug || !token || !filename || !page_key) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "slug, token, filename, page_key required",
        }),
      };
    }

    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/mint-upload-url`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_KEY}`,
          apikey: SUPABASE_KEY,
        },
        body: JSON.stringify({
          slug,
          token,
          filename,
          slot,
          page_key,   // 🔥 ВАЖНО
        }),
      }
    );

    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to contact Supabase function.",
        details: err.message,
      }),
    };
  }
}