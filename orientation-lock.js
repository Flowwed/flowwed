(function () {

  function goBackNow() {

    // iOS/Safari-safe
    setTimeout(() => {

      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = "dashboard.html";
      }

    }, 0);

  }

  const overlay = document.createElement("div");

  overlay.style.cssText = `
    position:fixed;
    inset:0;
    z-index:2147483647;

    display:none;

    background:rgba(0,0,0,.58);

    align-items:center;
    justify-content:center;
  `;

  const panel = document.createElement("div");

  panel.style.cssText = `
    position:relative;

    width:92vw;
    max-width:520px;

    padding:56px 34px;

    border-radius:32px;

    background:white;

    text-align:center;

    font-family:Inter,system-ui;

    color:#732323;
  `;

  const back = document.createElement("button");

  back.innerHTML = "←";

  back.style.cssText = `
    position:absolute;
    top:18px;
    left:18px;

    width:46px;
    height:46px;

    border:none;
    border-radius:50%;

    background:#fff;

    font-size:24px;

    cursor:pointer;

    z-index:999999999;

    pointer-events:auto;
  `;

  // 🔥 ВАЖНО:
  // onclick вместо addEventListener
  back.onclick = goBackNow;

  panel.innerHTML += `
    <div style="
      font-size:42px;
      margin-bottom:18px;
    ">
      ↻
    </div>

    <div style="
      font-size:30px;
      font-weight:700;
      line-height:1.35;
      margin-bottom:16px;
    ">
      Rotate your phone
    </div>

    <div style="
      font-size:18px;
      line-height:1.7;
      opacity:.8;
    ">
      Please use landscape mode.
    </div>
  `;

  panel.appendChild(back);

  overlay.appendChild(panel);

  document.body.appendChild(overlay);

  function mobile() {
    return window.innerWidth < 900;
  }

  function portrait() {
    return window.innerHeight >
           window.innerWidth;
  }

  function update() {

    if (
      mobile() &&
      portrait()
    ) {

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

  update();

  window.addEventListener(
    "resize",
    update
  );

  window.addEventListener(
    "orientationchange",
    update
  );

})();