export async function handler(event) {
  try {
    console.log("DELETE GUESTS START");

    const { token, ids } = JSON.parse(event.body);

    console.log("DELETE IDS:", ids);

    const SUPABASE_URL = "https://octwwpatppbenqwkcqaw.supabase.co";
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SERVICE_KEY) {
      return {
        statusCode: 500,
        body: "No service key"
      };
    }

    if (!token || !ids || !ids.length) {
      return {
        statusCode: 400,
        body: "Missing token or ids"
      };
    }

    // 🔥 формируем фильтр id
    const idFilter = ids.map(id => `id.eq.${id}`).join(",");

    // 🔥 DELETE запрос (как у тебя в видео, через REST)
    const deleteRes = await fetch(
      `${SUPABASE_URL}/rest/v1/guests?token=eq.${token}&or=(${idFilter})`,
      {
        method: "DELETE",
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const text = await deleteRes.text();

    console.log("DELETE STATUS:", deleteRes.status);
    console.log("DELETE RESPONSE:", text);

    if (!deleteRes.ok) {
      return {
        statusCode: 500,
        body: "Delete failed"
      };
    }

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