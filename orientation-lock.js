(function () {

  function goBackSafe() {

    try {

      if (
        window.history.length > 1
      ) {

        window.history.back();
        return;

      }

    } catch (e) {}

    location.replace("dashboard.html");

  }

  const overlay = document.createElement("div");

  overlay.style.cssText = `
    position:fixed;
    inset:0;
    z-index:999999999;
    display:none;
    align-items:center;
    justify-content:center;
    background:rgba(0,0,0,.55);
    backdrop-filter:blur(12px);
    -webkit-backdrop-filter:blur(12px);
  `;

  overlay.innerHTML = `
    <div style="
      position:relative;
      width:92vw;
      max-width:520px;
      padding:56px 34px 42px;
      border-radius:32px;
      text-align:center;
      background:linear-gradient(
        to bottom,
        rgba(255,255,255,.98),
        rgba(255,245,248,.95)
      );
      color:#732323;
      font-family:Inter,system-ui;
      box-shadow:0 30px 80px rgba(0,0,0,.35);
    ">

      <button id="rotateBackBtn" style="
        position:absolute;
        top:18px;
        left:18px;

        width:44px;
        height:44px;

        border:none;
        border-radius:50%;

        background:white;

        font-size:22px;
        color:#732323;

        display:flex;
        align-items:center;
        justify-content:center;

        cursor:pointer;

        box-shadow:
          0 8px 24px rgba(0,0,0,.18);

        z-index:100000000;
      ">
        ←
      </button>

      <div style="
        font-size:42px;
        margin-bottom:18px;
      ">
        ↻
      </div>

      <div style="
        font-size:28px;
        line-height:1.35;
        font-weight:700;
        margin-bottom:16px;
      ">
        Rotate your phone
      </div>

      <div style="
        font-size:18px;
        line-height:1.7;
        opacity:.82;
      ">
        This page works only in landscape mode.
      </div>

    </div>
  `;

  document.body.appendChild(overlay);

  const btn =
    document.getElementById("rotateBackBtn");

  btn.onclick = function (e) {

    e.preventDefault();
    e.stopPropagation();

    goBackSafe();

  };

  function isMobile() {
    return window.innerWidth < 900;
  }

  function isPortrait() {
    return window.innerHeight >
           window.innerWidth;
  }

  function update() {

    if (
      isMobile() &&
      isPortrait()
    ) {

      overlay.style.display = "flex";

      document.body.style.overflow = "hidden";

    } else {

      overlay.style.display = "none";

      document.body.style.overflow = "";

    }

  }

  update();

  addEventListener(
    "resize",
    update
  );

  addEventListener(
    "orientationchange",
    update
  );

})();