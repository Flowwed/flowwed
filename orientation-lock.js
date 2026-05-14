// === PERFECT CENTERED iOS OVERLAY ===

(function () {

  // lock scroll
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  // ===== BACK ACTION =====
  const goBack = () => {
    if (history.length > 1) {
      history.back();
    } else {
      location.href = "/";
    }
  };

  // ===== OVERLAY =====
  const overlay = document.createElement("div");

  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    zIndex: "999998",

    background: "rgba(0,0,0,0.76)",

    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    overflow: "hidden",

    cursor: "pointer"
  });

  // ===== CENTER BLOCK =====
  const box = document.createElement("div");

  Object.assign(box.style, {
    width: "100%",
    maxWidth: "320px",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    textAlign: "center",

    color: "#fff",

    fontFamily:
      '-apple-system,BlinkMacSystemFont,"SF Pro Display","SF Pro Text",sans-serif',

    padding: "24px",

    boxSizing: "border-box",

    // ЭТО ДЕЛАЕТ ИДЕАЛЬНЫЙ CENTER
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  });

  // ===== ICON =====
  const icon = document.createElement("div");

  icon.innerHTML = `
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
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
  `;

  Object.assign(icon.style, {
    marginBottom: "18px",
    opacity: "0.95"
  });

  // ===== TITLE =====
  const title = document.createElement("div");

  title.innerHTML = `Please rotate your phone`;

  Object.assign(title.style, {
    fontSize: "18px",
    lineHeight: "1.3",
    fontWeight: "600",
    letterSpacing: "-0.02em",
    marginBottom: "14px"
  });

  // ===== DESCRIPTION =====
  const desc = document.createElement("div");

  desc.innerHTML = `
    This admin panel is view-only on mobile devices.<br>
    Use desktop for full access.
  `;

  Object.assign(desc.style, {
    fontSize: "14px",
    lineHeight: "1.55",
    fontWeight: "400",
    opacity: "0.74"
  });

  // ===== ROUND iOS BACK BUTTON =====
  const backBtn = document.createElement("button");

  backBtn.innerHTML = `
    <span style="
      font-size:20px;
      line-height:1;
      margin-left:-1px;
    ">‹</span>
  `;

  Object.assign(backBtn.style, {
    position: "fixed",
    top: "18px",
    left: "18px",

    width: "44px",
    height: "44px",

    zIndex: "999999",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    border: "none",
    outline: "none",

    borderRadius: "999px",

    background: "rgba(255,255,255,0.14)",
    color: "#fff",

    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",

    boxShadow:
      "0 6px 22px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.08)",

    cursor: "pointer",

    transition: "0.15s ease"
  });

  // hover/tap
  backBtn.onmouseenter = () => {
    backBtn.style.background = "rgba(255,255,255,0.22)";
    backBtn.style.transform = "scale(1.05)";
  };

  backBtn.onmouseleave = () => {
    backBtn.style.background = "rgba(255,255,255,0.14)";
    backBtn.style.transform = "scale(1)";
  };

  // actions
  overlay.onclick = goBack;

  backBtn.onclick = (e) => {
    e.stopPropagation();
    goBack();
  };

  // build
  box.appendChild(icon);
  box.appendChild(title);
  box.appendChild(desc);

  overlay.appendChild(box);

  document.body.appendChild(overlay);
  document.body.appendChild(backBtn);

})();