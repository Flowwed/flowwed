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
    zIndex: "999998",

    // текст по центру
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    color: "#fff",
    fontSize: "28px",
    fontWeight: "700",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"SF Pro Text",sans-serif',
    textAlign: "center",
    padding: "20px"
  });

  // ТЕКСТ НА OVERLAY
  overlay.innerHTML = "ABRAKADABRA SHMABRAKADABRA";

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

    zIndex: "999999",

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

  // ФУНКЦИЯ BACK
  const goBack = () => {
    if (history.length > 1) {
      history.back();
    } else {
      location.href = "/";
    }
  };

  // КНОПКА BACK
  backBtn.onclick = goBack;

  // КЛИК ПО OVERLAY = ТОЖЕ BACK
  overlay.onclick = goBack;

  // Добавляем
  document.body.appendChild(overlay);
  document.body.appendChild(backBtn);

})();