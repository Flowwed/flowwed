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
      <div onclick="go('savethedate.html')">Save the Date</div>
      <div onclick="go('postwed.html')">RSVP</div>
      <div onclick="go('SeatingChart.html')">Seating</div>
      <div onclick="go('gift_registry.html')">Gifts</div>
      <div onclick="go('Budget.html')">Budget</div>
      <div onclick="go('traveldetails.html')">Travel & Event</div>
      <div onclick="go('postwed2.html')">Memories</div>
      <div onclick="go('just_married.html')">Album</div>
      <div onclick="go('story.html')">Our Story</div>
      <div onclick="go('dash-updates.html')">Updates</div>
      <div onclick="go('wedparty.html')">Wedding Party</div>
      <div onclick="go('wed_reports.html')">Wed Reports</div>
      <div onclick="go('guest_memory.html')">Guest Feedback</div>

    </div>
  `;

  const backBtn = document.getElementById("backBtn");
  backBtn.parentElement.insertAdjacentElement("afterend", nav);

  const btn = nav.querySelector("#menuBtn");
  const drop = nav.querySelector("#menuDrop");

  // 🔥 toggle по клику
  btn.onclick = (e) => {
    e.stopPropagation();
    drop.classList.toggle("open");
  };

  // 🔥 закрытие при клике вне
  document.addEventListener("click", () => {
    drop.classList.remove("open");
  });

  // 🔥 не закрывать при клике внутри
  drop.onclick = (e) => {
    e.stopPropagation();
  };

  window.go = function(page) {
    window.location.href = page + "?t=" + token;
  };
}