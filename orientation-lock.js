
(function () {
  // Создаем overlay
  const overlay = document.createElement("div");

  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    background: "rgba(15,15,15,0.75)",
    backdropFilter: "blur(6px)",
    zIndex: "999999",
    pointerEvents: "all",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: "20px",
    boxSizing: "border-box"
  });

  // Блокируем скролл страницы
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  // Создаем iOS-style кнопку Back
  const backBtn = document.createElement("button");

  backBtn.innerHTML = "← Back";

  Object.assign(backBtn.style, {
    appearance: "none",
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    fontSize: "17px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    padding: "10px 18px",
    borderRadius: "14px",
    cursor: "pointer",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    boxShadow: "0 4px 18px rgba(0,0,0,0.25)",
    transition: "all 0.2s ease"
  });

  // Hover эффект
  backBtn.addEventListener("mouseenter", () => {
    backBtn.style.background = "rgba(255,255,255,0.25)";
  });

  backBtn.addEventListener("mouseleave", () => {
    backBtn.style.background = "rgba(255,255,255,0.15)";
  });

  // Возврат назад
  backBtn.addEventListener("click", () => {
    history.back();
  });

  // Отключаем клики по overlay
  overlay.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
  });

  // Кнопка должна работать
  backBtn.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  overlay.appendChild(backBtn);

  // Добавляем overlay поверх страницы
  document.body.appendChild(overlay);
})();