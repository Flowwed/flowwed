export async function handler(event) {
  try {
    console.log("DELETE VIDEO START");

    const { token, path } = JSON.parse(event.body);
    console.log("DELETE PATH:", path);

    const SUPABASE_URL = "https://octwwpatppbenqwkcqaw.supabase.co";
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("SERVICE KEY LENGTH:", SERVICE_KEY?.length);

    if (!SERVICE_KEY) {
      return {
        statusCode: 500,
        body: "No service key"
      };
    }

    if (!token || !path) {
      return {
        statusCode: 400,
        body: "Missing token or path"
      };
    }

    // 🔥 1. УДАЛЯЕМ ФАЙЛ ИЗ STORAGE
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

    console.log("STORAGE STATUS:", storageRes.status);
    console.log("STORAGE RESPONSE:", storageText);

    // ❗ если файл не удалился — сразу стоп
    if (!storageRes.ok) {
      return {
        statusCode: 500,
        body: "Storage delete failed"
      };
    }

    // 🔥 2. ЧИСТИМ БАЗУ
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

    console.log("SITE STATUS:", siteRes.status);

    return {
      statusCode: 200,
      body: "OK"
    };

  } catch (err) {
    console.error("DELETE ERROR:", err);

    return {
      statusCode: 500,
      body: err.message
    };
  }
}