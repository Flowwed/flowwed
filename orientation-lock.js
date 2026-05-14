(function () {

  const overlay = document.createElement("div");

  overlay.id = "landscapeNotice";

  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",

    zIndex: "999999",

    display: "none",

    alignItems: "center",
    justifyContent: "center",

    background: "rgba(0,0,0,.55)",

    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",

    pointerEvents: "auto"
  });

  // ===== CONTENT =====

  overlay.innerHTML = `
    <div style="
      position:relative;

      width:92vw;
      max-width:520px;

      padding:48px 34px;

      border-radius:32px;

      text-align:center;

      background:linear-gradient(
        to bottom,
        rgba(255,255,255,.96),
        rgba(255,245,248,.94)
      );

      color:#732323;

      font-family:Inter,system-ui;

      box-shadow:
        0 30px 80px rgba(0,0,0,.35);
    ">

      <!-- iOS BACK BUTTON -->

      <button
        id="iosBackBtn"
        type="button"
        style="
          position:absolute;
          top:18px;
          left:18px;

          display:flex;
          align-items:center;
          justify-content:center;
          gap:6px;

          padding:10px 16px;

          border:none;
          border-radius:16px;

          background:rgba(255,255,255,.72);

          backdrop-filter:blur(10px);
          -webkit-backdrop-filter:blur(10px);

          color:#732323;

          font-size:17px;
          font-weight:600;

          cursor:pointer;

          z-index:99999999;

          box-shadow:
            0 6px 18px rgba(0,0,0,.18);

          -webkit-appearance:none;
          appearance:none;

          -webkit-tap-highlight-color:transparent;

          transition:.18s ease;
        "
      >
        ← Back
      </button>

      <!-- ICON -->

      <div style="
        font-size:38px;
        margin-bottom:18px;
      ">
        ↻
      </div>

      <!-- TITLE -->

      <div style="
        font-size:28px;
        line-height:1.4;
        font-weight:600;
        margin-bottom:16px;
      ">
        Please rotate your phone
      </div>

      <!-- TEXT -->

      <div style="
        font-size:18px;
        line-height:1.7;
        opacity:.85;
      ">
        This admin panel is view-only on mobile devices.<br>
        For full access, use a laptop or desktop.
      </div>

    </div>
  `;

  document.body.appendChild(overlay);

  // ===== BUTTON =====

  const backBtn =
    document.getElementById("iosBackBtn");

  // hover
  backBtn.addEventListener("mouseenter", () => {
    backBtn.style.background =
      "rgba(255,255,255,.95)";
  });

  backBtn.addEventListener("mouseleave", () => {
    backBtn.style.background =
      "rgba(255,255,255,.72)";
  });

  // click
  backBtn.addEventListener("click", function (e) {

    e.preventDefault();
    e.stopPropagation();

    // IMPORTANT:
    // кнопка теперь НЕ блокируется overlay

    if (
      window.history.length > 1
    ) {

      history.back();

    } else {

      // fallback
      window.location.href =
        "dashboard.html";

    }

  });

  // ===== HELPERS =====

  function isMobile() {
    return window.innerWidth < 900;
  }

  function isPortrait() {
    return window.matchMedia(
      "(orientation: portrait)"
    ).matches;
  }

  // ===== MAIN =====

  function updateOrientationNotice() {

    if (
      isMobile() &&
      isPortrait()
    ) {

      overlay.style.display = "flex";

      document.body.style.overflow =
        "hidden";

      document.body.style.height =
        "100dvh";

    } else {

      overlay.style.display = "none";

      document.body.style.overflow =
        "";

      document.body.style.height =
        "";

    }

  }

  updateOrientationNotice();

  window.addEventListener(
    "resize",
    updateOrientationNotice
  );

  window.addEventListener(
    "orientationchange",
    updateOrientationNotice
  );

  window.addEventListener(
    "pageshow",
    updateOrientationNotice
  );

})();