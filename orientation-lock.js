// === iOS Landscape Overlay ===
// shows ONLY on mobile portrait
// hides automatically in landscape

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
  // CREATE OVERLAY
  // =========================

  const overlay = document.createElement("div");

  overlay.id = "iosRotateOverlay";

  overlay.style.cssText = `
    position:fixed;
    inset:0;

    z-index:999999999;

    display:none;

    align-items:center;
    justify-content:center;

    background:rgba(18,18,18,.52);

    backdrop-filter:blur(8px);
-webkit-backdrop-filter:blur(8px);

    overflow:hidden;

    padding:24px;

    box-sizing:border-box;
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
        0 6px 22px rgba(0,0,0,.28),
        inset 0 1px 0 rgba(255,255,255,.08);

      cursor:pointer;

      transition:.15s ease;

      z-index:2;
    ">
      ‹
    </button>

    <!-- CENTER -->
    <div style="
      width:100%;
      max-width:280px;

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

      position:absolute;
      top:50%;
      left:50%;

      transform:translate(-50%,-50%);
    ">

      <!-- ICON -->
      <div style="
        margin-bottom:18px;
        opacity:.95;
      ">

        <svg
          width="40"
          height="40"
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
        font-size:19px;
        line-height:1.35;
        font-weight:600;

        letter-spacing:-0.02em;

        margin-bottom:12px;
      ">
        Rotate your phone
      </div>

      <!-- TEXT -->
      <div style="
        font-size:14px;
        line-height:1.6;
        opacity:.72;
      ">
        This page works only in landscape mode.
      </div>

    </div>
  `;

  document.body.appendChild(overlay);

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
  // DEVICE CHECKS
  // =========================

  function isMobile() {

    return (
      /Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent
      )
      ||
      window.innerWidth < 900
    );

  }

  function isPortrait() {

    return (
      window.innerHeight >
      window.innerWidth
    );

  }

  // =========================
  // UPDATE
  // =========================

  function updateOverlay() {

    const shouldShow =
      isMobile() &&
      isPortrait();

    if (shouldShow) {

      overlay.style.display = "flex";

      document.documentElement.style.overflow =
        "hidden";

      document.body.style.overflow =
        "hidden";

    } else {

      overlay.style.display = "none";

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

  // IMPORTANT:
  // iOS SAFARI FIX
  setTimeout(updateOverlay, 300);

  // EVENTS
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