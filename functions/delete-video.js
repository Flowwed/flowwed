export async function handler(event) {
  try {
    console.log("DELETE VIDEO START");

    const { token, path } = JSON.parse(event.body);
    console.log("BODY:", { token, path });

    const SUPABASE_URL = "https://octwwpatppbenqwkcqaw.supabase.co";
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    console.log("SERVICE KEY:", SERVICE_KEY ? "OK" : "MISSING");

    if (!token || !path) {
      return {
        statusCode: 400,
        body: "Missing data"
      };
    }

    // 🔥 1. УДАЛЕНИЕ ИЗ STORAGE
    const storageRes = await fetch(
      `${SUPABASE_URL}/storage/v1/object/galleries/${path}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${SERVICE_KEY}`,
          apikey: SERVICE_KEY
        }
      }
    );

    const storageText = await storageRes.text();
    console.log("STORAGE DELETE:", storageRes.status, storageText);

    // 🔥 2. ОЧИЩАЕМ video_path В ТАБЛИЦЕ sites
    const siteRes = await fetch(
      `${SUPABASE_URL}/rest/v1/sites?edit_token=eq.${token}`,
      {
        method: "PATCH",
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          video_path: null
        })
      }
    );

    console.log("SITE UPDATE:", siteRes.status);

    return {
      statusCode: 200,
      body: "Video deleted OK"
    };

  } catch (err) {
    console.error("DELETE VIDEO ERROR:", err);

    return {
      statusCode: 500,
      body: "Server error: " + err.message
    };
  }
}