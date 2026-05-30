(async () => {

  const token =
    new URLSearchParams(location.search).get("t");

  console.log("TOKEN =", token);

  const SUPABASE_URL =
    "https://octwwpatppbenqwkcqaw.supabase.co";

  const SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jdHd3cGF0cHBiZW5xd2tjcWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NjYxMjYsImV4cCI6MjA3NDU0MjEyNn0.kYX1yCkx3Zl2J_qLHZYcknLnx_aXl26zB--__MzkknI";

  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/rpc/is_protected_token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      },
      body: JSON.stringify({
        p_token: token
      })
    }
  );

  console.log("STATUS =", r.status);

  const txt = await r.text();

  console.log("BODY =", txt);

})();