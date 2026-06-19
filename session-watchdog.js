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