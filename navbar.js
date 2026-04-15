export function loadNavbar() {

  const params = new URLSearchParams(window.location.search);
  const token = params.get("t") || "";

  const nav = document.createElement("div");
  nav.className = "mini-menu";

  nav.innerHTML = `
    <div class="menu-trigger" id="menuBtn">☰ Menu</div>

    <div class="menu-dropdown" id="menuDrop">
      <div onclick="go('videouploader.html')">Web Video</div>
      <div onclick="go('Guests.html')">Guest Hub</div>
      <div onclick="go('upload.html')">Photo Gallery</div>
    </div>
  `;

  const backBtn = document.getElementById("backBtn");
  backBtn.parentElement.insertAdjacentElement("afterend", nav);

  // 🔥 ВАЖНО — через document, не через nav
  const btn = document.getElementById("menuBtn");
  const drop = document.getElementById("menuDrop");

  btn.addEventListener("click", function(e) {
    e.stopPropagation();
    drop.classList.toggle("open");
  });

  document.addEventListener("click", function() {
    drop.classList.remove("open");
  });

  drop.addEventListener("click", function(e) {
    e.stopPropagation();
  });

  window.go = function(page) {
    window.location.href = page + "?t=" + token;
  };
}