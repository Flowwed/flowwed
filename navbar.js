export function loadNavbar() {

  const current = window.location.pathname.split("/").pop();

  const nav = document.createElement("div");

  nav.innerHTML = `
    <div style="
      position: fixed;
      left: 0;
      top: 0;
      width: 220px;
      height: 100%;
      background: #9c1818;
      padding: 16px;
      box-sizing: border-box;
    ">

      <div style="
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      ">

        <button class="nav-btn ${current==='videouploader.html' ? 'active' : ''}" onclick="go('videouploader.html')">📸<br>Video</button>

        <button class="nav-btn ${current==='Guests.html' ? 'active' : ''}" onclick="go('Guests.html')">👥<br>Guests</button>
        <button class="nav-btn ${current==='upload.html' ? 'active' : ''}" onclick="go('upload.html')">📸<br>Gallery</button>
        <button class="nav-btn ${current==='savethedate.html' ? 'active' : ''}" onclick="go('savethedate.html')">📅<br>Date</button>
        <button class="nav-btn ${current==='postwed.html' ? 'active' : ''}" onclick="go('postwed.html')">✉️<br>RSVP</button>
        <button class="nav-btn ${current==='SeatingChart.html' ? 'active' : ''}" onclick="go('SeatingChart.html')">🪑<br>Seats</button>
        <button class="nav-btn ${current==='gift_registry.html' ? 'active' : ''}" onclick="go('gift_registry.html')">🎁<br>Gifts</button>
        <button class="nav-btn ${current==='Budget.html' ? 'active' : ''}" onclick="go('Budget.html')">💰<br>Budget</button>
        <button class="nav-btn ${current==='traveldetails.html' ? 'active' : ''}" onclick="go('traveldetails.html')">🌍<br>Travel</button>
        <button class="nav-btn ${current==='postwed2.html' ? 'active' : ''}" onclick="go('postwed2.html')">❤️<br>Memory</button>
        <button class="nav-btn ${current==='just_married.html' ? 'active' : ''}" onclick="go('just_married.html')">🖼<br>Album</button>
        <button class="nav-btn ${current==='story.html' ? 'active' : ''}" onclick="go('story.html')">💞<br>Story</button>
        <button class="nav-btn ${current==='dash-updates.html' ? 'active' : ''}" onclick="go('dash-updates.html')">📢<br>Updates</button>
        <button class="nav-btn ${current==='wedparty.html' ? 'active' : ''}" onclick="go('wedparty.html')">👯<br>Party</button>
        <button class="nav-btn ${current==='wed_reports.html' ? 'active' : ''}" onclick="go('wed_reports.html')">📊<br>Reports</button>
        <button class="nav-btn ${current==='guest_memory.html' ? 'active' : ''}" onclick="go('guest_memory.html')">💬<br>Talk</button>

      </div>

    </div>
  `;

  document.body.appendChild(nav);
}

window.go = function(page) {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("t") || "";

  window.location.href = page + "?t=" + token;
};