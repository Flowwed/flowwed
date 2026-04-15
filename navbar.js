export function loadNavbar() {

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

        <button class="nav-btn" onclick="go('dashboard.html')">🏠<br>Dash</button>
        <button class="nav-btn" onclick="go('Guests.html')">👥<br>Guests</button>
        <button class="nav-btn" onclick="go('upload.html')">📸<br>Gallery</button>
        <button class="nav-btn" onclick="go('savethedate.html')">📅<br>Date</button>
        <button class="nav-btn" onclick="go('postwed.html')">✉️<br>RSVP</button>
        <button class="nav-btn" onclick="go('SeatingChart.html')">🪑<br>Seats</button>
        <button class="nav-btn" onclick="go('gift_registry.html')">🎁<br>Gifts</button>
        <button class="nav-btn" onclick="go('Budget.html')">💰<br>Budget</button>
        <button class="nav-btn" onclick="go('traveldetails.html')">🌍<br>Travel</button>
        <button class="nav-btn" onclick="go('postwed2.html')">❤️<br>Memory</button>
        <button class="nav-btn" onclick="go('just_married.html')">🖼<br>Album</button>
        <button class="nav-btn" onclick="go('story.html')">💞<br>Story</button>
        <button class="nav-btn" onclick="go('dash-updates.html')">📢<br>Updates</button>
        <button class="nav-btn" onclick="go('wedparty.html')">👯<br>Party</button>
        <button class="nav-btn" onclick="go('wed_reports.html')">📊<br>Reports</button>
        <button class="nav-btn" onclick="go('guest_memory.html')">💬<br>Talk</button>

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