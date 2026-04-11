export async function handler(event) {
  try {
    console.log("DELETE VIDEO START");

    const { token, path } = JSON.parse(event.body);
    console.log("BODY:", { token, path });

    const SUPABASE_URL = "https://octwwpatppbenqwkcqaw.supabase.co";
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SERVICE_KEY) {
      console.error("❌ NO SERVICE ROLE KEY");
      return {
        statusCode: 500,
        body: "Missing service key"
      };
    }

    if (!token || !path) {
      return {
        statusCode: 400,
        body: "Missing data"
      };
    }

    console.log("DELETE PATH:", path);

    // ✅ 1. УДАЛЕНИЕ ИЗ STORAGE (ПРАВИЛЬНЫЙ СПОСОБ)
    const storageRes = await fetch(
      `${SUPABASE_URL}/storage/v1/object/remove`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SERVICE_KEY}`,
          apikey: SERVICE_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          bucketId: "galleries",
          paths: [path] // 👈 ВАЖНО: массив!
        })
      }
    );

    const storageJson = await storageRes.json();
    console.log("STORAGE DELETE:", storageRes.status, storageJson);

    if (!storageRes.ok) {
      return {
        statusCode: 500,
        body: "Storage delete failed: " + JSON.stringify(storageJson)
      };
    }

    // ✅ 2. ОЧИЩАЕМ БД
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

    const siteText = await siteRes.text();
    console.log("SITE UPDATE:", siteRes.status, siteText);

    return {
      statusCode: 200,
      body: "✅ Video deleted completely"
    };

  } catch (err) {
    console.error("DELETE VIDEO ERROR:", err);

    return {
      statusCode: 500,
      body: "Server error: " + err.message
    };
  }
}