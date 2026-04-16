export function loadNavbar() {

  const params = new URLSearchParams(window.location.search);
  const token = params.get("t") || "";

  const nav = document.createElement("div");
  nav.className = "mini-menu";

  nav.innerHTML = `
    <div class="menu-trigger" id="menuBtn">☰ Menu</div>

    <div class="menu-dropdown" id="menuDrop">

<div class="menu-back" id="menuBack">← Back to Dash</div>
    <div class="menu-divider"></div>

<div data-page="videouploader" onclick="go('videouploader.html')">Web Video</div>
<div data-page="guests" onclick="go('Guests.html')">Guest Hub</div>
<div data-page="photo-gallery" onclick="go('upload.html')">Photo Gallery</div>
<div data-page="savethedate" onclick="go('savethedate.html')">Save the Date</div>
<div data-page="postwed" onclick="go('postwed.html')">RSVP</div>
<div data-page="seating" onclick="go('SeatingChart.html')">Seating</div>
<div data-page="gifts" onclick="go('gift_registry.html')">Gifts</div>
<div data-page="budget" onclick="go('Budget.html')">Budget</div>
<div data-page="travel" onclick="go('traveldetails.html')">Travel & Event</div>
<div data-page="memories" onclick="go('postwed2.html')">Memories</div>
<div data-page="album" onclick="go('just_married.html')">Album</div>
<div data-page="story" onclick="go('story.html')">Our Story</div>
<div data-page="updates" onclick="go('dash-updates.html')">Updates</div>
<div data-page="wedparty" onclick="go('wedparty.html')">Wedding Party</div>

    </div>
  `;


  const backBtn = document.getElementById("backBtn");
  backBtn.parentElement.insertAdjacentElement("afterend", nav);

  const btn = nav.querySelector("#menuBtn");
  const drop = nav.querySelector("#menuDrop");


/* 🔥 Back to Dash */
const backMenu = nav.querySelector("#menuBack");

backMenu.onclick = () => {
  window.location.href = "/dashboard.html?t=" + encodeURIComponent(token);
};

/* 🔥 toggle по клику */
btn.onclick = (e) => {
  e.stopPropagation();
  drop.classList.toggle("open");
};

/* 🔥 закрытие при клике вне */
document.addEventListener("click", () => {
  drop.classList.remove("open");
});

/* 🔥 не закрывать при клике внутри */
drop.onclick = (e) => {
  e.stopPropagation();
};

/* 🔥 переходы */
window.go = function(page) {
  window.location.href = page + "?t=" + token;
};

/* 🔥 ПОДСВЕТКА ТЕКУЩЕЙ СТРАНИЦЫ */
const currentPage = document.body.dataset.page;

nav.querySelectorAll(".menu-dropdown div").forEach(item => {
  if (item.dataset.page === currentPage) {
    item.classList.add("active");
  }
});

}