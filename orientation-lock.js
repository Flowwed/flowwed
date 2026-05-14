// ==========================================
// iOS LANDSCAPE OVERLAY
// shows only on MOBILE PORTRAIT
// hides automatically in LANDSCAPE
// ==========================================

(function () {

  // =========================
  // SAFE BACK
  // =========================

  function goBackSafe() {

    try {

      if (window.history.length > 1) {
        window.history.back();
        return;
      }

    } catch (e) {}

    location.replace("/");

  }

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
  // PORTRAIT CHECK
  // =========================

  function isPortrait() {

    return (
      window.innerHeight >
      window.innerWidth
    );

  }

  // =========================
  // CREATE OVERLAY
  // =========================

  const overlay =
    document.createElement("div");

  overlay.id =
    "iosRotateOverlay";

  overlay.style.cssText = `
    position:fixed;
    inset:0;

    z-index:999999999;

    display:none;

    background:rgba(24,24,28,.42);

    backdrop-filter:blur(7px);
    -webkit-backdrop-filter:blur(7px);

    overflow:hidden;

    cursor:pointer;
  `;

  // =========================
  // HTML
  // =========================

  overlay.innerHTML = `

    <!-- ROUND iOS BACK -->
    <button id="rotateBackBtn" style="
      position:absolute;
      top:18px;
      left:18px;

      width:44px;
      height:44px;

      border:none;
      outline:none;

      border-radius:999px;

      background:rgba(255,255,255,.14);

      color:white;

      display:flex;
      align-items:center;
      justify-content:center;

      font-size:24px;
      font-weight:500;

      backdrop-filter:blur(16px);
      -webkit-backdrop-filter:blur(16px);

      box-shadow:
        0 6px 22px rgba(0,0,0,.18),
        inset 0 1px 0 rgba(255,255,255,.08);

      cursor:pointer;

      transition:.15s ease;

      z-index:10;
    ">
      ‹
    </button>

    <!-- PERFECT CENTER -->
    <div style="
      position:absolute;

      top:50%;
      left:50%;

      transform:translate(-50%,-50%);

      width:100%;
      max-width:310px;

      padding:0 16px;

      box-sizing:border-box;

      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;

      text-align:center;

      color:white;

      font-family:
        -apple-system,
        BlinkMacSystemFont,
        'SF Pro Display',
        'SF Pro Text',
        sans-serif;
    ">

      <!-- ICON -->
      <div style="
        margin-bottom:12px;
        opacity:.96;

        display:flex;
        align-items:center;
        justify-content:center;
      ">

        <svg
          width="42"
          height="42"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M21 12a9 9 0 1 1-2.64-6.36"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
          />

          <path
            d="M21 3v6h-6"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

      </div>

      <!-- TITLE -->
      <div style="
        font-size:24px;
        line-height:1.12;

        font-weight:600;

        letter-spacing:-0.03em;

        margin-bottom:14px;
      ">
        Rotate your phone
      </div>

      <!-- TEXT -->
      <div style="
        font-size:16px;
        line-height:1.45;

        font-weight:400;

        opacity:.84;

        max-width:290px;
      ">

        View-only mode on mobile devices.
        <br><br>

        Use laptop for full access.

      </div>

    </div>
  `;

  // =========================
  // APPEND
  // =========================

  document.body.appendChild(
    overlay
  );

  // =========================
  // BUTTON
  // =========================

  const backBtn =
    document.getElementById(
      "rotateBackBtn"
    );

  backBtn.onclick = function (e) {

    e.preventDefault();
    e.stopPropagation();

    goBackSafe();

  };

  // =========================
  // OVERLAY CLICK
  // =========================

  overlay.onclick = function () {
    goBackSafe();
  };

  // =========================
  // UPDATE
  // =========================

  function updateOverlay() {

    const shouldShow =
      isMobile() &&
      isPortrait();

    if (shouldShow) {

      overlay.style.display =
        "block";

      document.documentElement.style.overflow =
        "hidden";

      document.body.style.overflow =
        "hidden";

    } else {

      overlay.style.display =
        "none";

      document.documentElement.style.overflow =
        "";

      document.body.style.overflow =
        "";

    }

  }

  // =========================
  // INIT
  // =========================

  updateOverlay();

  // iOS Safari fix
  setTimeout(
    updateOverlay,
    300
  );

  // =========================
  // EVENTS
  // =========================

  window.addEventListener(
    "resize",
    updateOverlay
  );

  window.addEventListener(
    "orientationchange",
    function () {

      setTimeout(
        updateOverlay,
        250
      );

    }
  );

})();