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
<button onclick="go('dashboard.html')">Dashboard</button>
<br><br>
<button onclick="go('Guests.html')">Guests</button>    
</div>
  `;

  document.body.appendChild(nav);
}

window.go = function(page) {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("t") || "";

  window.location.href = page + "?t=" + token;
};