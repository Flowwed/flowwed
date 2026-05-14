(function () {

  const overlay = document.createElement("div");

  overlay.id = "landscapeNotice";

  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.right = "0";
  overlay.style.bottom = "0";

  overlay.style.width = "100vw";
  overlay.style.height = "100dvh";

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

      padding:54px 34px 42px;

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
        margin-bottom:28px;
      ">
        This admin panel is view-only on mobile devices.<br>
        For full access, use a laptop or desktop.
      </div>

      <button
        id="iosBackBtn"
        type="button"
        style="
          width:100%;

          padding:16px 0;

          border:none;
          border-radius:18px;

          background:#a52126;

          color:#fff;

          font-size:18px;
          font-weight:600;

          cursor:pointer;

          box-shadow:
            0 12px 28px rgba(0,0,0,.22);

          -webkit-appearance:none;
          appearance:none;

          -webkit-tap-highlight-color:transparent;
        "
      >
        ← Back
      </button>

    </div>
  `;

  document.body.appendChild(overlay);

  const backBtn =
    document.getElementById("iosBackBtn");

  function goBack(e) {

    e.preventDefault();
    e.stopPropagation();

    const fallback =
      "dashboard.html";

    if (
      document.referrer &&
      document.referrer !== location.href
    ) {

      window.location.href =
        document.referrer;

      return;
    }

    if (history.length > 1) {

      history.back();

      setTimeout(() => {

        if (
          location.pathname.includes(
            fallback
          )
        ) return;

        window.location.href =
          fallback;

      }, 400);

      return;
    }

    window.location.href =
      fallback;

  }

  backBtn.onclick = goBack;

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

      overlay.style.display =
        "flex";

      document.body.style.overflow =
        "hidden";

    } else {

      overlay.style.display =
        "none";

      document.body.style.overflow =
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