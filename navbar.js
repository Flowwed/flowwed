export function loadNavbar() {

  const params = new URLSearchParams(window.location.search);
  const token = params.get("t") || "";

  const current = window.location.pathname;

  const nav = document.createElement("div");
  nav.className = "top-nav";

  nav.innerHTML = `
    ${link('videouploader.html','Web Video')}
    ${link('Guests.html','Guest Hub')}
    ${link('upload.html','Photo Gallery')}
    ${link('savethedate.html','Save the Date')}
    ${link('postwed.html','RSVP')}
    ${link('SeatingChart.html','Seating')}
    ${link('gift_registry.html','Gifts')}
    ${link('Budget.html','Budget')}
    ${link('traveldetails.html','Travel & Event')}
    ${link('postwed2.html','Memories')}
    ${link('just_married.html','Album')}
    ${link('story.html','Our Story')}
    ${link('dash-updates.html','Updates')}
    ${link('wedparty.html','Wedding Party')}
    ${link('wed_reports.html','Wed Reports')}
    ${link('guest_memory.html','Guest Feedback')}
  `;

  const header = document.querySelector("h1");
  if (header) {
    header.insertAdjacentElement("afterend", nav);
  } else {
    document.body.prepend(nav);
  }

  function link(page, text) {
    const active = current.includes(page) ? "active" : "";
    return `<span class="${active}" onclick="go('${page}')">${text}</span>`;
  }

  window.go = function(page) {
    window.location.href = page + "?t=" + token;
  };
}