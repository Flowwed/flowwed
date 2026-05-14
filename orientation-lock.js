// === iOS Style Rotate Overlay + Back Button ===

(function () {

  // Блокируем скролл
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  // ===== BACK FUNCTION =====
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

    background: "rgba(0,0,0,0.72)",

    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    padding: "30px",
    boxSizing: "border-box",

    cursor: "pointer"
  });

  // ===== CENTER CONTENT =====
  const content = document.createElement("div");

  Object.assign(content.style, {
    textAlign: "center",
    color: "#fff",
    maxWidth: "420px",

    fontFamily:
      '-apple-system,BlinkMacSystemFont,"SF Pro Display","SF Pro Text",sans-serif',

    transform: "translateY(-6%)"
  });

  // ===== ROTATE ICON =====
  const icon = document.createElement("div");

  icon.innerHTML = `
    <svg width="58" height="58" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 12a9 9 0 1 1-2.64-6.36"
        stroke="white"
        stroke-width="2.2"
        stroke-linecap="round"
      />
      <path
        d="M21 3v6h-6"
        stroke="white"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `;

  Object.assign(icon.style, {
    marginBottom: "24px",
    opacity: "0.95"
  });

  // ===== TITLE =====
  const title = document.createElement("div");

  title.innerHTML = `
    Please rotate your phone
  `;

  Object.assign(title.style, {
    fontSize: "42px",
    lineHeight: "1.12",
    fontWeight: "700",
    letterSpacing: "-0.03em",
    marginBottom: "26px"
  });

  // ===== DESCRIPTION =====
  const desc = document.createElement("div");

  desc.innerHTML = `
    This admin panel is view-only on mobile devices.<br><br>
    For full access, use a laptop or desktop.
  `;

  Object.assign(desc.style, {
    fontSize: "22px",
    lineHeight: "1.55",
    fontWeight: "400",
    opacity: "0.82"
  });

  // ===== iOS BACK BUTTON =====
  const backBtn = document.createElement("button");

  backBtn.innerHTML = `
    <span style="font-size:22px">‹</span>
    <span>Back</span>
  `;

  Object.assign(backBtn.style, {
    position: "fixed",
    top: "18px",
    left: "18px",

    zIndex: "999999",

    height: "52px",
    padding: "0 18px",

    display: "flex",
    alignItems: "center",
    gap: "6px",

    border: "none",
    outline: "none",

    borderRadius: "999px",

    background: "rgba(255,255,255,0.14)",
    color: "#fff",

    fontSize: "20px",
    fontWeight: "500",

    fontFamily:
      '-apple-system,BlinkMacSystemFont,"SF Pro Text",sans-serif',

    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",

    boxShadow:
      "0 6px 24px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.08)",

    cursor: "pointer",

    transition: "0.18s ease"
  });

  // Hover / tap
  backBtn.onmouseenter = () => {
    backBtn.style.background = "rgba(255,255,255,0.22)";
    backBtn.style.transform = "scale(1.03)";
  };

  backBtn.onmouseleave = () => {
    backBtn.style.background = "rgba(255,255,255,0.14)";
    backBtn.style.transform = "scale(1)";
  };

  // ===== ACTIONS =====
  backBtn.onclick = (e) => {
    e.stopPropagation();
    goBack();
  };

  overlay.onclick = goBack;

  // ===== BUILD =====
  content.appendChild(icon);
  content.appendChild(title);
  content.appendChild(desc);

  overlay.appendChild(content);

  document.body.appendChild(overlay);
  document.body.appendChild(backBtn);

})();