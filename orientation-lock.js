(function(){

  const overlay = document.createElement("div");

  overlay.id = "landscapeNotice";

  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.right = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100dvh";

  overlay.style.zIndex = "999999";

  overlay.style.background = "rgba(0,0,0,.55)";
  overlay.style.backdropFilter = "blur(12px)";

  overlay.style.display = "none";

  overlay.innerHTML = `
    <div style="
      position:relative;

      width:92vw;
      max-width:520px;

      padding:60px 42px 160px;

      text-align:center;

      background:linear-gradient(
        to bottom,
        rgba(255,255,255,.96),
        rgba(255,245,248,.94)
      );

      backdrop-filter: blur(12px) saturate(160%);
      -webkit-backdrop-filter: blur(12px) saturate(160%);

      color:#732323;

      font-family:Inter,system-ui;
    ">

      <button onclick="noticeGoBack()" style="
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

        display:flex;
        align-items:center;
        justify-content:center;

        box-shadow:
          0 6px 18px rgba(0,0,0,.18);
      ">
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

<div style="
  position:fixed;
  left:0;
  right:0;
  bottom:0;

  padding:18px 24px 28px;

  display:flex;
  justify-content:center;

  background:linear-gradient(
    to top,
    rgba(255,245,248,.96),
    rgba(255,245,248,.85)
  );

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  box-shadow:0 -12px 40px rgba(0,0,0,.25);
">
  <button onclick="noticeGoBack()" style="
    width:100%;
    max-width:420px;

    padding:16px 0;
    border:none;
    border-radius:16px;

    font-size:20px;
    font-weight:600;

    background:#a52126;
    color:white;

    box-shadow:0 12px 28px rgba(0,0,0,.25);
  ">
    ← Back
  </button>
</div>

    </div>
  `;

  document.body.appendChild(overlay);

  function noticeGoBack(){

    if (history.length > 1) {
      history.back();
    } else {
      window.location.href = "dashboard.html";
    }

  }

  function isMobile() {
    return window.innerWidth < 900;
  }

  function isPortrait() {
    return window.matchMedia("(orientation: portrait)").matches;
  }

  function update() {

    if (isMobile() && isPortrait()) {

      overlay.style.display = "block";

      document.body.style.overflow = "hidden";

    } else {

      overlay.style.display = "none";

      document.body.style.overflow = "";

    }

  }

  window.addEventListener("pageshow", update);
  window.addEventListener("resize", update);
  window.addEventListener("orientationchange", update);

  update();

})();