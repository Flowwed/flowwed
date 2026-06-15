const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jdHd3cGF0cHBiZW5xd2tjcWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NjYxMjYsImV4cCI6MjA3NDU0MjEyNn0.kYX1yCkx3Zl2J_qLHZYcknLnx_aXl26zB--__MzkknI";


(async function trialGuard() {

  const params = new URLSearchParams(window.location.search);

  const token =
    params.get("t") ||
    params.get("token") ||
    params.get("TOKEN") ||
    params.get("T") ||
    localStorage.getItem("verified_token") ||
    "";

  if (params.get("t")) {
    localStorage.setItem("verified_token", params.get("t"));
  }

  if (!token) {
    document.body.innerHTML = "No access";
    throw new Error("No token");
  }

  const resTrial = await fetch(
    `https://octwwpatppbenqwkcqaw.supabase.co/rest/v1/sites?edit_token=eq.${token}&select=trial_expires_at,is_trial`,
    {
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": "Bearer " + SUPABASE_ANON_KEY
      }
    }
  );

  const trialData = await resTrial.json();

  if (!trialData.length) {
    document.body.innerHTML = "Invalid access";
    throw new Error("Invalid token");
  }

  const trial = trialData[0];

  if (trial.is_trial) {
    const now = new Date();
    const expires = new Date(trial.trial_expires_at);

    if (expires < now) {
      document.body.innerHTML = `
        <div style="
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          height:100vh;
          font-family:Inter, sans-serif;
          text-align:center;
          background:#fff7fa;
          color:#7a3a4a;
          padding:20px;
        ">
          <h1 style="font-size:28px;margin-bottom:10px;">
            Your trial has ended
          </h1>

          <p style="font-size:16px;margin-bottom:30px;max-width:400px;">
            Continue planning your wedding with full access.
          </p>

          <a href="https://flowweds.netlify.app" style="
            background:#9c1818;
            color:white;
            padding:14px 28px;
            border-radius:12px;
            text-decoration:none;
            font-weight:600;
            box-shadow:0 8px 20px rgba(0,0,0,0.25);
          ">
            Buy your FloWWed
          </a>
        </div>
      `;

      throw new Error("Expired");
    }
  }

})();