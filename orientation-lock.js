// ==========================================
// MOBILE ACCESS LIMIT
// full landing page works normally
// but protected actions are blocked
// on mobile devices
// ==========================================

(function () {

  // =========================
  // SETTINGS
  // =========================

  const BLOCKED_SELECTORS = `
    .try-free,
    [data-desktop-only],
    a[href="/app"],
    a[href="/dashboard"]
  `;

  // =========================
  // MOBILE CHECK
  // =========================

  function isMobile() {

    return (
      window.matchMedia(
        "(pointer:coarse)"
      ).matches
      ||
      /Android|iPhone|iPad|iPod/i
        .test(navigator.userAgent)
    );

  }

  // =========================
  // CREATE POPUP
  // =========================

  function createPopup() {

    // already exists
    if (
      document.getElementById(
        "desktopOnlyPopup"
      )
    ) {
      return;
    }

    // =========================
    // OVERLAY
    // =========================

    const popup =
      document.createElement("div");

    popup.id =
      "desktopOnlyPopup";

    popup.style.cssText = `
      position:fixed;
      inset:0;

      z-index:999999999;

      display:flex;
      align-items:center;
      justify-content:center;

      padding:20px;

      background:
        rgba(10,10,14,.46);

      backdrop-filter:blur(10px);
      -webkit-backdrop-filter:blur(10px);

      opacity:0;
      pointer-events:none;

      transition:
        opacity .18s ease;
    `;

    // =========================
    // BOX
    // =========================

    popup.innerHTML = `

      <div style="
        width:min(100%,340px);

        border-radius:28px;

        padding:28px 24px;

        box-sizing:border-box;

        background:
          rgba(22,22,26,.92);

        color:white;

        text-align:center;

        font-family:
          -apple-system,
          BlinkMacSystemFont,
          'SF Pro Display',
          sans-serif;

        box-shadow:
          0 20px 60px rgba(0,0,0,.35);
      ">

        <!-- ICON -->
        <div style="
          font-size:40px;
          margin-bottom:14px;
        ">
          💻
        </div>

        <!-- TITLE -->
        <div style="
          font-size:24px;
          line-height:1.1;

          font-weight:650;

          letter-spacing:-0.03em;

          margin-bottom:14px;
        ">
          Mobile Experience Is Not Supported
        </div>

        <!-- TEXT -->
        <div style="
          font-size:15px;
          line-height:1.5;

          opacity:.82;

          margin-bottom:22px;
        ">

          Laptop or Desktop Only 
          

          <br><br>

          You can still explore
          the landing page on mobile.

        </div>

        <!-- BUTTON -->
        <button id="desktopOnlyCloseBtn" style="
          width:100%;

          height:48px;

          border:none;
          outline:none;

          border-radius:16px;

          background:white;

          color:black;

          font-size:15px;
          font-weight:600;

          cursor:pointer;
        ">
          OK
        </button>

      </div>
    `;

    document.body.appendChild(
      popup
    );

    // =========================
    // OPEN
    // =========================

    requestAnimationFrame(() => {

      popup.style.opacity =
        "1";

      popup.style.pointerEvents =
        "auto";

    });

    // =========================
    // CLOSE
    // =========================

    function closePopup() {

      popup.style.opacity =
        "0";

      popup.style.pointerEvents =
        "none";

      setTimeout(() => {
        popup.remove();
      }, 180);

    }

    // button
    document
      .getElementById(
        "desktopOnlyCloseBtn"
      )
      .addEventListener(
        "click",
        closePopup
      );

    // overlay click
    popup.addEventListener(
      "click",
      function (e) {

        if (e.target === popup) {
          closePopup();
        }

      }
    );

  }

  // =========================
  // BLOCK MOBILE ACTIONS
  // =========================

  document.addEventListener(
    "click",
    function (e) {

      // desktop allowed
      if (!isMobile()) return;

      // protected action
      const blocked =
        e.target.closest(
          BLOCKED_SELECTORS
        );

      if (!blocked) return;

      // stop navigation
      e.preventDefault();
      e.stopPropagation();

      // show popup
      createPopup();

    },
    true
  );

})();