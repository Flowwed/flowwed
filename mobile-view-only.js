// ==========================================
// MOBILE VIEW-ONLY LOCK
// blocks interaction on mobile
// except MENU button
// ==========================================

(function () {

  // =========================
  // SETTINGS
  // =========================

  const MENU_SELECTOR =
    ".menu-btn, #menuBtn, [data-menu]";

  // =========================
  // MOBILE CHECK
  // =========================

  function isMobile() {

    return (
      /Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent
      ) ||
      window.innerWidth < 900
    );

  }

  // =========================
  // CREATE OVERLAY
  // =========================

  const lockLayer =
    document.createElement("div");

  lockLayer.id =
    "mobileViewOnlyLock";

lockLayer.style.cssText = `
  position:fixed;
  inset:0;

  z-index:99999998;

  display:none;

  background:rgba(0,0,0,0.001);

  touch-action:none;
`;
  document.body.appendChild(
    lockLayer
  );

  // =========================
  // MESSAGE
  // =========================

  const message =
    document.createElement("div");

  message.innerHTML = `
    View-only mode on mobile.<br>
    Use desktop for full access.
  `;

  message.style.cssText = `
    position:fixed;

    left:50%;
    bottom:20px;

    transform:translateX(-50%);

    z-index:99999999;

    padding:10px 14px;

    border-radius:14px;

    background:rgba(20,20,20,.72);

    backdrop-filter:blur(12px);
    -webkit-backdrop-filter:blur(12px);

    color:white;

    font-size:13px;
    line-height:1.4;

    font-family:
      -apple-system,
      BlinkMacSystemFont,
      sans-serif;

    text-align:center;

    opacity:0;
    pointer-events:none;

    transition:.2s ease;
  `;

  document.body.appendChild(
    message
  );

  // =========================
  // ENABLE LOCK
  // =========================

  function enableLock() {

    lockLayer.style.display =
      "block";

    message.style.opacity =
      "1";

    document.body.style.userSelect =
      "none";

    document.body.style.webkitUserSelect =
      "none";

  }

  // =========================
  // DISABLE LOCK
  // =========================

  function disableLock() {

    lockLayer.style.display =
      "none";

    message.style.opacity =
      "0";

    document.body.style.userSelect =
      "";

    document.body.style.webkitUserSelect =
      "";

  }

  // =========================
  // UPDATE
  // =========================

  function updateLock() {

    if (isMobile()) {
      enableLock();
    } else {
      disableLock();
    }

  }

  // =========================
  // BLOCK ALL CLICKS
  // =========================

  document.addEventListener(
    "click",
    function (e) {

      if (!isMobile()) return;

      const menu =
        e.target.closest(
          MENU_SELECTOR
        );

      // MENU allowed
      if (menu) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

    },
    true
  );

  // =========================
  // BLOCK INPUTS
  // =========================

  document.addEventListener(
    "focusin",
    function (e) {

      if (!isMobile()) return;

      const menu =
        e.target.closest(
          MENU_SELECTOR
        );

      if (menu) return;

      e.target.blur();

    },
    true
  );


  // =========================
  // INIT
  // =========================

  updateLock();

  window.addEventListener(
    "resize",
    updateLock
  );

})();