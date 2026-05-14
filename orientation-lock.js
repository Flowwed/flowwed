// === Full overlay + working iOS-style Back button ===

(function () {
  // Overlay
  const overlay = document.createElement("div");

  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    background: "rgba(15,15,15,0.72)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    zIndex: "999999",
    pointerEvents: "auto"
  });

  // Блокируем страницу под overlay
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  // Контейнер кнопки
  const topBar = document.createElement("div");

  Object.assign(topBar.style, {
    position: "absolute",
    top: "20px",
    left: "20px",
    zIndex: "1000000"
  });

  // iOS-style Back button
  const backBtn = document.createElement("button");
  backBtn.innerHTML = "← Back";

  Object.assign(backBtn.style, {
    appearance: "none",
    border: "none",
    background: "rgba(255,255,255,0.16)",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: "14px",
    fontSize: "17px",
    fontWeight: "500",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
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

  // ВАЖНО:
  // Если есть история -> назад
  // Если нет -> fallback
  backBtn.onclick = function (e) {
    e.stopPropagation();

    if (window.history.length > 1) {
      window.history.back();
    } else {
      // fallback если страница открыта напрямую
      window.location.href = "/";
      // или:
      // window.close();
    }
  };

  topBar.appendChild(backBtn);
  overlay.appendChild(topBar);

  // Полностью блокируем клики по странице
  overlay.addEventListener(
    "click",
    function (e) {
      e.preventDefault();
      e.stopPropagation();
    },
    true
  );

  document.body.appendChild(overlay);
})();