export async function handler(event) {
  try {
    console.log("DELETE START");

    const { token, slot, path } = JSON.parse(event.body);
    console.log("BODY:", { token, slot, path });

    const SUPABASE_URL = "https://octwwpatppbenqwkcqaw.supabase.co";
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    console.log("SERVICE KEY:", SERVICE_KEY ? "OK" : "MISSING");

    if (!token || !slot || !path) {
      return {
        statusCode: 400,
        body: "Missing data"
      };
    }

    // 🔥 1. УДАЛЕНИЕ ИЗ STORAGE (фикс headers)
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

    // 🔥 2. УДАЛЕНИЕ ИЗ captions (добавили page_key)
    const capRes = await fetch(
      `${SUPABASE_URL}/rest/v1/guests_photo_captions?edit_token=eq.${token}&page_key=eq.story&slot=eq.${slot}`,
      {
        method: "DELETE",
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`
        }
      }
    );

    console.log("CAPTIONS DELETE:", capRes.status);

    // 🔥 3. УДАЛЕНИЕ ИЗ gallery_images (если есть)
    const imgRes = await fetch(
      `${SUPABASE_URL}/rest/v1/gallery_images?edit_token=eq.${token}&slot=eq.${slot}`,
      {
        method: "DELETE",
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`
        }
      }
    );

    console.log("IMAGES DELETE:", imgRes.status);

    return {
      statusCode: 200,
      body: "Deleted OK"
    };

  } catch (err) {
    console.error("DELETE ERROR:", err);

    return {
      statusCode: 500,
      body: "Server error: " + err.message
    };
  }
}