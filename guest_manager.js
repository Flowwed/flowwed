// FINAL guest_manager.js (Combined STEP 3 + STEP 5)
// Clean architecture, optimized rendering, parallel email sending
// Security untouched exactly as requested

import { createClient } from "https://esm.sh/@supabase/supabase-js";

/* =====================================================
   SUPABASE CLIENT (unchanged)
===================================================== */
const supabase = createClient(
  "https://octwwpatppbenqwkcqaw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jdHd3cGF0cHBiZW5xd2tjcWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NjYxMjYsImV4cCI6MjA3NDU0MjEyNn0.kYX1yCkx3Zl2J_qLHZYcknLnx_aXl26zB--__MzkknI"
);

/* =====================================================
   DOM HELPERS
===================================================== */
const qs = (s) => document.querySelector(s);
const qsa = (s) => [...document.querySelectorAll(s)];

/* =====================================================
   STATE
===================================================== */
let guests = [];
let currentFilter = "all";
const tbody = qs("#guestTable tbody");
const token = new URLSearchParams(location.search).get("t");

/* =====================================================
   ICON RENDERER
===================================================== */
function icon(status) {
  const s = (status || "").toLowerCase();
  const map = {
    yes: "<span style='color:green;font-size:20px;'>✔</span>",
    no: "<span style='color:red;font-size:20px;'>✘</span>",
    maybe: "<span style='color:#ffd400;font-size:20px;'>❔</span>",
    "": "<span style='color:#ff9800;font-size:20px;'>⚠️</span>"
  };
  return map[s] || map[""];
}

/* =====================================================
   LOAD COUPLE NAME
===================================================== */
async function loadCoupleName() {
  const { data } = await supabase
    .from("sites")
    .select("slug")
    .eq("edit_token", token)
    .single();

  if (!data?.slug) return;

  const [a, b] = data.slug.split("-");
  qs("#coupleSmallName").textContent =
    `${a[0].toUpperCase() + a.slice(1)} & ${b[0].toUpperCase() + b.slice(1)}`;
}
loadCoupleName();

/* =====================================================
   LOAD GUESTS
===================================================== */
async function loadGuests() {
  if (!token) return;

  const { data } = await supabase
    .from("guests")
    .select("*")
    .eq("token", token)
    .order("created_at");

  guests = data.map((g) => ({
    id: g.id,
    first: g.first_name || "",
    last: g.last_name || "",
    email: g.email || "",
    phone: g.phone || "",
    std: g.std_status || "",
    rsvp: g.rsvp_status || ""
  }));

  render();
}
loadGuests();

/* =====================================================
   RENDER — FAST VERSION
===================================================== */
function render() {
  tbody.innerHTML = guests
    .map(
      (g, i) => `
      <tr data-id="${g.id}" data-email="${g.email}" data-phone="${g.phone}" data-std="${g.std}" data-rsvp="${g.rsvp}">
        <td><input type="checkbox" class="rowCheck" data-id="${g.id}" data-email="${g.email}" data-phone="${g.phone}"></td>
        <td>${i + 1}</td>
        <td>${g.first}</td>
        <td>${g.last}</td>
        <td>${g.email}</td>
        <td>${g.phone}</td>
        <td>${icon(g.std)}</td>
        <td>${icon(g.rsvp)}</td>
      </tr>`
    )
    .join("");

  applyGuestFilters();
}

/* =====================================================
   ADD GUEST
===================================================== */
qs("#addGuestTopBtn").onclick = () => qs("#guestForm").requestSubmit();

qs("#guestForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const first = firstName.value.trim();
  const last = lastName.value.trim();
  const email = qs("#email").value.trim();
  const phone = countryCode.value + qs("#phone").value.trim();

  if (!first || !last || !email || !qs("#phone").value.trim() || !countryCode.value)
    return alert("Fill all fields and select country code!");

  const { data } = await supabase
    .from("guests")
    .insert([{ first_name: first, last_name: last, email, phone, token }])
    .select();

  guests.push({ id: data[0].id, first, last, email, phone, std: "", rsvp: "" });
  render();

  e.target.reset();
  countryCode.value = "";
  toast("Guest added & saved!");
});

/* =====================================================
   TOAST
===================================================== */
function toast(msg) {
  const t = qs("#greenToast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1500);
}

/* =====================================================
   SELECT ALL
===================================================== */
qs("#selectAll").onclick = (e) => {
  qsa(".rowCheck").forEach((c) => (c.checked = e.target.checked));
};

/* =====================================================
   DELETE GUESTS
===================================================== */
let idsToDelete = [];

qs("#deleteSelected").onclick = () => {
  const checked = qsa(".rowCheck:checked");
  if (!checked.length) return alert("Nothing selected");

  idsToDelete = checked.map((c) => c.dataset.id);
  qs("#deleteConfirmOverlay").style.display = "flex";
};

qs("#deleteCancelBtn").onclick = () =>
  (qs("#deleteConfirmOverlay").style.display = "none");

qs("#deleteYesBtn").onclick = async () => {
  await supabase.from("guests").delete().in("id", idsToDelete);

  guests = guests.filter((g) => !idsToDelete.includes(g.id));
  render();

  qs("#deleteConfirmOverlay").style.display = "none";
  qs("#selectAll").checked = false;
};

/* =====================================================
   EXPORT CSV
===================================================== */
qs("#exportCsv").onclick = () => {
  const visible = qsa("#guestTable tbody tr").filter(
    (r) => r.style.display !== "none"
  );

  if (!visible.length) return alert("No guests to export!");

  const csv = [
    ["First", "Last", "Email", "Phone", "STD", "RSVP"],
    ...visible.map((r) => {
      const c = r.children;
      return [
        c[2].innerText,
        c[3].innerText,
        c[4].innerText,
        c[5].innerText,
        c[6].innerText,
        c[7].innerText
      ];
    })
  ]
    .map((r) => r.map((x) => `"${x}"`).join(","))
    .join("\n");

  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "wedding_guests.csv";
  a.click();
};

/* =====================================================
   EMAIL COMPOSER (STEP 5 merged)
===================================================== */
qs("#sendEmailBtn").onclick = openComposer;
qs("#composerClose").onclick = () => (qs("#emailComposer").style.display = "none");

function openComposer() {
  const selected = qsa(".rowCheck:checked");
  if (!selected.length) return alert("Select at least one guest!");

  const emails = [...new Set(selected.map((c) => c.dataset.email))];
  const phones = [...new Set(selected.map((c) => c.dataset.phone))];

  qs("#composerEmails").value = emails.join(", ");
  qs("#composerPhones").value = phones.join(", ");

  qs("#emailComposer").style.display = "block";
}

/* =====================================================
   EMAIL: QUEUE SYSTEM (FIXED)
===================================================== */
qs("#composerSend").onclick = async () => {
  const selected = qsa(".rowCheck:checked");
  if (!selected.length) return alert("Select at least one guest!");

  const subject = qs("#composerSubject").value.trim();
  const htmlBody = qs("#composerBody").value.trim().replace(/\n/g, "<br>");

  if (!subject || !htmlBody) {
    return alert("Please enter both subject and message.");
  }

 const guestList = selected.map((c) => {
  console.log("EMAIL DEBUG:", c.dataset.email);

  return {
    id: Number(c.dataset.id),
    email: c.dataset.email,
    token: token
  };
});

  const overlay = qs("#sendProgressOverlay");
  const bar = qs("#progressBar");
  const text = qs("#progressText");

  overlay.style.display = "flex";
  bar.style.width = "50%";
  text.textContent = "Adding emails to queue…";

  let response;
  try {
    response = await fetch("/.netlify/functions/create-email-queue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guests: guestList,
        subject,
        html: htmlBody
      })
    });
  } catch (err) {
    overlay.style.display = "none";
    return alert("Network error. Please try again.");
  }

  const result = await response.json();



  bar.style.width = "100%";
  text.textContent = `Queued: ${result.queued || guestList.length} emails`;

  setTimeout(() => {
    overlay.style.display = "none";
    alert("Emails have been added to the sending queue.\nDelivery will continue in the background.");
  }, 800);
};
