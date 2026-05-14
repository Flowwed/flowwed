// ==========================================
// MOBILE READ-ONLY MODE
// keeps page alive,
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
      window.matchMedia("(pointer:coarse)").matches ||
      /Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent
      )
    );

  }

  // =========================
  // OVERLAY (visual only)
  // =========================

  const lockLayer =
    document.createElement("div");

  lockLayer.id =
    "mobileReadOnlyLayer";

  lockLayer.style.cssText = `
    position:fixed;
    inset:0;

    z-index:99999998;

    display:none;

    background:rgba(0,0,0,0.001);

    pointer-events:none;
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

    transition:opacity .2s ease;
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

  }

  // =========================
  // DISABLE LOCK
  // =========================

  function disableLock() {

    lockLayer.style.display =
      "none";

    message.style.opacity =
      "0";

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
  // BLOCK INTERACTION
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
      if (menu) return;

      // block only interactive elements
      const interactive =
        e.target.closest(`
          a,
          button,
          input,
          textarea,
          select,
          option,
          label,
          summary,
          details,
          iframe,
          video,
          audio,
          [role="button"],
          [onclick],
          [contenteditable="true"]
        `);

      if (!interactive) return;

      e.preventDefault();
      e.stopPropagation();

    },
    true
  );

  // =========================
  // BLOCK INPUT FOCUS
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

      const blocked =
        e.target.closest(`
          input,
          textarea,
          select,
          [contenteditable="true"]
        `);

      if (!blocked) return;

      e.target.blur();

    },
    true
  );

  // =========================
  // PREVENT TEXT SELECTION
  // =========================

  document.addEventListener(
    "selectstart",
    function (e) {

      if (!isMobile()) return;

      const menu =
        e.target.closest(
          MENU_SELECTOR
        );

      if (menu) return;

      e.preventDefault();

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