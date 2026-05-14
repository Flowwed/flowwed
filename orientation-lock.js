// === Overlay + рабочая iOS Back кнопка ===

(function () {

  // OVERLAY
  const overlay = document.createElement("div");

  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    background: "rgba(0,0,0,0.72)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    zIndex: "999998"
  });

  // Блокируем страницу
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  // BACK BUTTON
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
    backBtn.style.background = "rgba(255,255,255,0.25)";
  };

  backBtn.onmouseleave = () => {
    backBtn.style.background = "rgba(255,255,255,0.16)";
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
  document.body.appendChild(overlay);
  document.body.appendChild(backBtn);

})();