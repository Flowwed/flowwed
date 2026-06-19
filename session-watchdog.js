const SESSION_KEY = "admin_last_activity";
const TIMEOUT_MINUTES = 2;

let sessionExpired = false;

/* =========================
   ACTIVITY
   ========================= */

function updateActivity() {

  if (sessionExpired) return;

  localStorage.setItem(
    SESSION_KEY,
    Date.now().toString()
  );

}

/* =========================
   MODAL
   ========================= */

function showSessionExpiredModal() {

  if (
    document.getElementById(
      "sessionExpiredModal"
    )
  ) {
    return;
  }

  sessionExpired = true;

  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div
      id="sessionExpiredModal"
      style="
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.45);
        display:flex;
        align-items:center;
        justify-content:center;
        z-index:99999999;
      "
    >

      <div
        style="
          width:340px;
          background:white;
          border-radius:20px;
          padding:24px;
          text-align:center;
          box-shadow:0 20px 50px rgba(0,0,0,.25);
        "
      >

        <div
          style="
            font-size:20px;
            font-weight:700;
            color:#b41111;
            margin-bottom:14px;
          "
        >
          Session Expired
        </div>

        <div
          style="
            font-size:15px;
            line-height:1.5;
            color:#555;
            margin-bottom:20px;
          "
        >
          You have been away for a while.
        </div>

        <button
          id="reloadSessionBtn"
          style="
            background:#b41111;
            color:white;
            border:none;
            border-radius:12px;
            padding:12px 22px;
            font-weight:700;
            cursor:pointer;
          "
        >
          Continue
        </button>

      </div>

    </div>
    `
  );

  document
    .getElementById(
      "reloadSessionBtn"
    )
    .addEventListener(
      "click",
      () => {

        localStorage.setItem(
          SESSION_KEY,
          Date.now().toString()
        );

        location.reload();

      }
    );

}

/* =========================
   CHECK TIMER
   ========================= */

function checkSession() {

  if (sessionExpired) return;

  const last = Number(
    localStorage.getItem(
      SESSION_KEY
    ) || 0
  );

  if (!last) return;

  const expired =
    Date.now() - last >
    TIMEOUT_MINUTES *
    60 *
    1000;

  if (expired) {
    showSessionExpiredModal();
  }

}

/* =========================
   FIRST RUN
   ========================= */

if (
  !localStorage.getItem(
    SESSION_KEY
  )
) {

  localStorage.setItem(
    SESSION_KEY,
    Date.now().toString()
  );

}

/* =========================
   USER ACTIVITY
   ========================= */

document.addEventListener(
  "click",
  updateActivity
);

document.addEventListener(
  "keydown",
  updateActivity
);

document.addEventListener(
  "input",
  updateActivity
);

/* =========================
   WATCHDOG
   ========================= */

setInterval(
  checkSession,
  5000
);