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
      <button onclick="alert('Dashboard')">Dashboard</button>
      <br><br>
      <button onclick="alert('Guests')">Guests</button>
    </div>
  `;

  document.body.appendChild(nav);
}