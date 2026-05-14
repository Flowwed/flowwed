// === Overlay + iOS Back + текстовое окно ===

(function () {

  // OVERLAY
  const overlay = document.createElement("div");

  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",

    background: "rgba(0,0,0,0.72)",

    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",

    zIndex: "999998",

    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  });

  // Блокируем страницу
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  // ===== TEXT WINDOW =====

  const modal = document.createElement("div");

  modal.innerHTML = `
    <div style="
      font-size:42px;
      margin-bottom:18px;
    ">
      ↻
    </div>

    <div style="
      font-size:30px;
      line-height:1.35;
      font-weight:700;
      margin-bottom:18px;
    ">
      Please rotate your phone
    </div>

    <div style="
      font-size:18px;
      line-height:1.7;
      opacity:.82;
    ">
      This page is optimized for landscape mode.<br>
      Rotate your device for the best experience.
    </div>
  `;

  Object.assign(modal.style, {
    width: "92vw",
    maxWidth: "520px",

    padding: "52px 36px",

    borderRadius: "32px",

    textAlign: "center",

    background:
      "linear-gradient(to bottom, rgba(255,255,255,.96), rgba(255,245,248,.94))",

    color: "#732323",

    fontFamily: "Inter,system-ui",

    boxShadow:
      "0 30px 80px rgba(0,0,0,.35)"
  });

  // ===== BACK BUTTON =====

  const backBtn = document.createElement("button");

  backBtn.innerHTML = "← Back";

  Object.assign(backBtn.style, {
    position: "fixed",
    top: "20px",
    left: "20px",

    zIndex: "999999", // ВЫШЕ overlay

    appearance: "none",
    border: "none",
    outline: "none",

    padding: "10px 18px",
    borderRadius: "14px",

    background: "rgba(255,255,255,0.16)",
    color: "#fff",

    fontSize: "17px",
    fontWeight: "500",

    fontFamily:
      '-apple-system,BlinkMacSystemFont,"SF Pro Text",sans-serif',

    cursor: "pointer",

    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",

    boxShadow: "0 4px 18px rgba(0,0,0,.25)"
  });

  // Hover
  backBtn.onmouseenter = () => {
    backBtn.style.background =
      "rgba(255,255,255,0.25)";
  };

  backBtn.onmouseleave = () => {
    backBtn.style.background =
      "rgba(255,255,255,0.16)";
  };

  // BACK ACTION
  backBtn.onclick = () => {

    if (history.length > 1) {
      history.back();
    } else {
      location.href = "/";
    }

  };

  // Добавляем
  overlay.appendChild(modal);

  document.body.appendChild(overlay);
  document.body.appendChild(backBtn);

})();