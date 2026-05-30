(async () => {

  const token =
    new URLSearchParams(location.search).get("t");

  if (!token) return;

  const SUPABASE_URL =
    "https://octwwpatppbenqwkcqaw.supabase.co";

  const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jdHd3cGF0cHBiZW5xd2tjcWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NjYxMjYsImV4cCI6MjA3NDU0MjEyNn0.kYX1yCkx3Zl2J_qLHZYcknLnx_aXl26zB--__MzkknI";


  const SESSION_KEY =
    "vip_auth_" + token;

  if (sessionStorage.getItem(SESSION_KEY) === "1") {
    return;
  }

  try {

    const protectedRes = await fetch(
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

    const isProtected =
      await protectedRes.json();

    if (!isProtected) return;

    createOverlay();

  } catch (err) {

    console.error(err);

    document.body.innerHTML = `
      <div style="
        position:fixed;
        inset:0;
        display:flex;
        align-items:center;
        justify-content:center;
        background:#111;
        color:#fff;
        font-family:Arial,sans-serif;
        z-index:999999;
      ">
        Security check failed
      </div>
    `;

  }

  function createOverlay() {

    const overlay =
      document.createElement("div");

    overlay.id = "vip-overlay";

    overlay.innerHTML = `
      <div class="vip-card">

        <div class="vip-lock">🔒</div>

        <h2>Protected Site</h2>

        <p>
          Enter password to continue
        </p>

        <input
          id="vip-password"
          type="password"
          placeholder="Password"
        >

        <button id="vip-submit">
          Continue
        </button>

        <div id="vip-error"></div>

      </div>
    `;

    const style =
      document.createElement("style");

    style.textContent = `
      #vip-overlay{
        position:fixed;
        inset:0;
        z-index:999999;
        background:rgba(0,0,0,.92);

        display:flex;
        align-items:center;
        justify-content:center;

        font-family:
          system-ui,
          sans-serif;
      }

      .vip-card{
        width:340px;
        max-width:90vw;

        background:#fff;

        border-radius:18px;

        padding:32px;

        text-align:center;

        box-shadow:
          0 20px 60px rgba(0,0,0,.4);
      }

      .vip-lock{
        font-size:42px;
        margin-bottom:10px;
      }

      .vip-card h2{
        margin:0 0 10px;
      }

      .vip-card p{
        margin:0 0 20px;
        color:#666;
      }

      #vip-password{
        width:100%;
        box-sizing:border-box;

        padding:12px;

        border:1px solid #ccc;
        border-radius:10px;

        font-size:16px;
      }

      #vip-submit{
        width:100%;

        margin-top:14px;

        padding:12px;

        border:0;

        border-radius:10px;

        cursor:pointer;

        font-size:16px;

        background:#111;
        color:#fff;
      }

      #vip-submit:hover{
        opacity:.9;
      }

      #vip-error{
        color:#c62828;
        margin-top:12px;
        min-height:20px;
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(overlay);

    const input =
      document.getElementById(
        "vip-password"
      );

    const button =
      document.getElementById(
        "vip-submit"
      );

    const error =
      document.getElementById(
        "vip-error"
      );

    input.focus();

    input.addEventListener(
      "keydown",
      e => {
        if (e.key === "Enter") {
          button.click();
        }
      }
    );

    button.addEventListener(
      "click",
      async () => {

        error.textContent = "";

        const password =
          input.value.trim();

        if (!password) {
          error.textContent =
            "Enter password";
          return;
        }

        button.disabled = true;
        button.textContent =
          "Checking...";

        try {

          const r = await fetch(
            `${SUPABASE_URL}/rest/v1/rpc/check_token_password`,
            {
              method:"POST",
              headers:{
                "Content-Type":"application/json",
                apikey:SUPABASE_KEY,
                Authorization:
                  `Bearer ${SUPABASE_KEY}`
              },
              body:JSON.stringify({
                p_token:token,
                p_password:password
              })
            }
          );

          const ok =
            await r.json();

          if (!ok) {

            error.textContent =
              "Wrong password";

            button.disabled = false;
            button.textContent =
              "Continue";

            return;
          }

          sessionStorage.setItem(
            SESSION_KEY,
            "1"
          );

          overlay.remove();

        } catch(err){

          console.error(err);

          error.textContent =
            "Verification failed";

          button.disabled = false;
          button.textContent =
            "Continue";
        }

      }
    );

  }

})();