(function(){

  const overlay = document.createElement("div");

  overlay.id = "landscapeNotice";

  overlay.style.position = "fixed";
  overlay.style.inset = "0";

  overlay.style.width = "100%";
  overlay.style.height = "100dvh";

  overlay.style.zIndex = "999999";

  overlay.style.display = "none";

  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";

  overlay.style.background = "rgba(0,0,0,.55)";
  overlay.style.backdropFilter = "blur(12px)";

  overlay.innerHTML = `
    <div style="
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

      <div style="
        font-size:32px;
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
        line-height:1.6;
        opacity:.85;
      ">
        This page works best in landscape mode.
      </div>

    </div>
  `;

  document.body.appendChild(overlay);

  function isMobile(){
    return window.innerWidth < 900;
  }

  function isPortrait(){
    return window.matchMedia("(orientation: portrait)").matches;
  }

  function updateOrientationNotice(){

    if (isMobile() && isPortrait()) {

      overlay.style.display = "flex";

      document.body.style.overflow = "hidden";

      document.body.style.height = "100dvh";

      document.body.style.touchAction = "none";

      document.body.style.pointerEvents = "none";

      overlay.style.pointerEvents = "all";

    } else {

      overlay.style.display = "none";

      document.body.style.overflow = "";

      document.body.style.height = "";

      document.body.style.touchAction = "";

      document.body.style.pointerEvents = "";

      overlay.style.pointerEvents = "";

    }
  }

  updateOrientationNotice();

  window.addEventListener("resize", updateOrientationNotice);

  window.addEventListener(
    "orientationchange",
    updateOrientationNotice
  );

  window.addEventListener(
    "pageshow",
    updateOrientationNotice
  );

})();
