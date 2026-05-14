(function () {

  const overlay = document.createElement("div");

  overlay.id = "landscapeNotice";

  overlay.style.position = "fixed";
  overlay.style.inset = "0";

  overlay.style.zIndex = "999999";

  overlay.style.display = "none";

  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";

  overlay.style.background = "rgba(0,0,0,.55)";

  overlay.style.backdropFilter = "blur(12px)";
  overlay.style.webkitBackdropFilter = "blur(12px)";

  overlay.style.pointerEvents = "auto";

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

      <button
        id="iosBackBtn"
        type="button"
        style="
          position:absolute;
          top:18px;
          left:18px;

          width:42px;
          height:42px;

          border:none;
          border-radius:50%;

          background:rgba(255,255,255,.72);

          backdrop-filter:blur(10px);
          -webkit-backdrop-filter:blur(10px);

          font-size:22px;
          color:#732323;

          cursor:pointer;

          z-index:9999999;

          display:flex;
          align-items:center;
          justify-content:center;

          box-shadow:
            0 6px 18px rgba(0,0,0,.18);

          -webkit-appearance:none;
          appearance:none;

          -webkit-tap-highlight-color:transparent;
        "
      >
        ←
      </button>

      <div style="
        font-size:38px;
        margin-bottom:18px;
      ">
        ↻
      </div>

      <div style="
        font-size:28px;
        line-height:1.4;
        font-weight:600;
        margin-bottom:16px;
      ">
        Please rotate your phone
      </div>

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

  const backBtn =
    document.getElementById("iosBackBtn");

  backBtn.addEventListener("click", function (e) {

    e.preventDefault();
    e.stopPropagation();

    if (
      document.referrer &&
      document.referrer !== location.href
    ) {

      history.back();

    } else {

      window.location.href =
        "dashboard.html";

    }

  });

  function isMobile() {
    return window.innerWidth < 900;
  }

  function isPortrait() {
    return window.matchMedia(
      "(orientation: portrait)"
    ).matches;
  }

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