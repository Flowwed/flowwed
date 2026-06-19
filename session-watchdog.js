const SESSION_KEY = "admin_last_activity";
const TIMEOUT_MINUTES = 2;

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

  const diff =
    Date.now() - last;

  return diff >
    TIMEOUT_MINUTES *
    60 *
    1000;
}

/* Проверяем сразу при открытии страницы */

if (isSessionExpired()) {

  alert(
    "You have been away for a while. Please refresh this page to continue."
  );

}

/* После проверки начинаем отслеживать активность */

updateActivity();

document.addEventListener(
  "click",
  updateActivity
);

document.addEventListener(
  "keydown",
  updateActivity
);

document.addEventListener(
  "scroll",
  updateActivity
);

document.addEventListener(
  "input",
  updateActivity
);