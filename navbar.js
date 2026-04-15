export function loadNavbar() {

  const nav = document.createElement("div");

  nav.innerHTML = `
    <div style="
      position: fixed;
      left: 0;
      top: 0;
      width: 200px;
      height: 100%;
      background: #9c1818;
      padding: 20px;
      color: white;
    ">

      <div style="display:flex; flex-direction:column; gap:10px;">

        <button onclick="go('dashboard.html')">🏠 Dashboard</button>
        <button onclick="go('Guests.html')">👥 Guests</button>
        <button onclick="go('upload.html')">📸 Gallery</button>
        <button onclick="go('savethedate.html')">📅 Save Date</button>
        <button onclick="go('postwed.html')">✉️ RSVP</button>
        <button onclick="go('SeatingChart.html')">🪑 Seating</button>
        <button onclick="go('gift_registry.html')">🎁 Gifts</button>
        <button onclick="go('Budget.html')">💰 Budget</button>
        <button onclick="go('traveldetails.html')">🌍 Travel</button>
        <button onclick="go('postwed2.html')">❤️ Memories</button>
        <button onclick="go('just_married.html')">🖼 Album</button>
        <button onclick="go('story.html')">💞 Story</button>
        <button onclick="go('dash-updates.html')">📢 Updates</button>
        <button onclick="go('wedparty.html')">👯 Party</button>
        <button onclick="go('wed_reports.html')">📊 Reports</button>
        <button onclick="go('guest_memory.html')">💬 Feedback</button>

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