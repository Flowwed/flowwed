const SESSION_KEY = "admin_last_activity";
const TIMEOUT_MINUTES = 2;

console.log("WATCHDOG LOADED");

function updateActivity() {

  localStorage.setItem(
    SESSION_KEY,
    Date.now().toString()
  );

}

function isSessionExpired() {

  const last = Number(
    localStorage.getItem(
      SESSION_KEY
    ) || 0
  );

  if (!last) return false;

  return (
    Date.now() - last >
    TIMEOUT_MINUTES * 60 * 1000
  );

}

function handleActivity() {

  if (isSessionExpired()) {

    alert(
      "You have been away for a while. Please refresh this page to continue."
    );

    return;
  }

  updateActivity();

}

/* первый запуск */

if (
  !localStorage.getItem(
    SESSION_KEY
  )
) {

  updateActivity();

}

/* события пользователя */

document.addEventListener(
  "click",
  handleActivity
);

document.addEventListener(
  "keydown",
  handleActivity
);

document.addEventListener(
  "input",
  handleActivity
);

console.log(
  "LAST =",
  localStorage.getItem(
    SESSION_KEY
  )
);

function showSessionExpiredModal() {

  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div id="sessionExpiredModal"
      style="
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.45);
        display:flex;
        align-items:center;
        justify-content:center;
        z-index:9999999;
      ">

      <div
        style="
          width:340px;
          background:white;
          border-radius:20px;
          padding:24px;
          text-align:center;
          box-shadow:0 20px 50px rgba(0,0,0,.25);
        ">

        <div
          style="
            font-size:20px;
            font-weight:700;
            color:#b41111;
            margin-bottom:14px;
          ">
          Session Expired
        </div>

        <div
          style="
            font-size:15px;
            line-height:1.5;
            color:#555;
            margin-bottom:20px;
          ">
          You have been away for a while.<br><br>
          Would you like to continue your session?
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
          ">
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
      () => location.reload()
    );
}