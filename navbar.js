export function loadNavbar() {

  const params = new URLSearchParams(window.location.search);
  const token = params.get("t") || "";
  const current = window.location.pathname;

  const nav = document.createElement("div");
  nav.className = "top-nav";

  nav.innerHTML = `

    ${link('videouploader.html','Web Video')}
    ${link('Guests.html','Guests')}

    ${dropdown('Planning', [
      ['savethedate.html','Save the Date'],
      ['postwed.html','RSVP'],
      ['SeatingChart.html','Seating'],
      ['Budget.html','Budget'],
      ['traveldetails.html','Travel']
    ])}

    ${dropdown('Media', [
      ['upload.html','Gallery'],
      ['postwed2.html','Memories'],
      ['just_married.html','Album'],
      ['story.html','Story']
    ])}

    ${dropdown('Reports', [
      ['wed_reports.html','Reports'],
      ['dash-updates.html','Updates'],
      ['guest_memory.html','Feedback'],
      ['wedparty.html','Wedding Party']
    ])}

  `;

  const header = document.querySelector("h1");
  header.insertAdjacentElement("afterend", nav);

  function link(page, text) {
    const active = current.includes(page) ? "active" : "";
    return `<span class="${active}" onclick="go('${page}')">${text}</span>`;
  }

  function dropdown(title, items) {
    return `
      <div class="nav-dropdown">
        <span>${title}</span>
        <div class="dropdown-menu">
          ${items.map(i => `
            <div onclick="go('${i[0]}')">${i[1]}</div>
          `).join("")}
        </div>
      </div>
    `;
  }

  window.go = function(page) {
    window.location.href = page + "?t=" + token;
  };
}