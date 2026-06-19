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
  font-size:42px;
  margin-bottom:12px;
">
  💻
</div>


      <!-- TITLE -->
      <div style="
        font-size:24px;
        line-height:1.12;

        font-weight:600;

        letter-spacing:-0.03em;

        margin-bottom:14px;
      ">
        Mobile Not Supported
      </div>

      <!-- TEXT -->
      <div style="
        font-size:16px;
        line-height:1.45;

        font-weight:400;

        opacity:.84;

        max-width:290px;
      ">

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
  isMobile();


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