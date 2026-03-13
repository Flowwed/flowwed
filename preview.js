// =========================================
// preview.js — FULLY ISOLATED + SAFE
// =========================================

import { createClient } from "https://esm.sh/@supabase/supabase-js";

// ===== Helpers =====
const qs  = (s) => document.querySelector(s);
const qsa = (s) => [...document.querySelectorAll(s)];

// ===== Supabase =====
const supabase = createClient(
  "https://octwwpatppbenqwkcqaw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jdHd3cGF0cHBiZW5xd2tjcWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NjYxMjYsImV4cCI6MjA3NDU0MjEyNn0.kYX1yCkx3Zl2J_qLHZYcknLnx_aXl26zB--__MzkknI"
);

// ===== URL params =====
const params = new URLSearchParams(location.search);
const token  = params.get("t")     || "";
const type   = params.get("type")  || "save";
const tplId  = params.get("tpl")   || "save1";
const method = params.get("method")|| "email";

const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : "";

// =========================
// FOOTER INJECTION
// =========================
async function loadSenderEmail() {
  if (!token) return "";
  const { data } = await supabase
    .from("sites")
    .select("email")
    .eq("edit_token", token)
    .single();

  return data?.email?.trim() || "";
}

async function applyFooter(html) {
  const senderEmail = await loadSenderEmail();
  if (!senderEmail) return html;

  const footer = `
    <p style="
      font-family:Poppins, sans-serif;
      font-size:14px;
      color:#777;
      margin-top:30px;
      border-top:1px solid #eee;
      padding-top:15px;
    ">
      Please do not reply to this automated sending address.<br>
      If you need to contact us, please use our email:
      <strong>${senderEmail}</strong>.
    </p>
  `;

  return html + footer;
}

// =========================
// LOAD COUPLE
// =========================
async function loadCouple() {
  if (!token) return null;

  const { data } = await supabase
    .from("sites")
    .select("slug")
    .eq("edit_token", token)
    .single();

  if (!data) return null;

  const parts = (data.slug || "").split("-");

  return {
    bride: capitalize(parts[0] || "Bride"),
    groom: capitalize(parts[1] || "Groom"),
    location: capitalize(parts[2] || "Your city")
  };
}

// =========================
// GUIDELINES BLOCK
// =========================
function applyGuidelines() {
  const title = qs("#guidelinesTitle");
  const text  = qs("#guidelinesText");

  if (!title || !text) return;

  if (type === "save") {
    title.textContent = "Save-the-Date Instructions";
    text.innerHTML = `
      1. Select the date of your event 
      <a id="stdHere">here</a>; 
      2. Select the guests you would like to send STD message; 
      3. Tap “Send Email & SMS”.
    `;
  } else {
    title.textContent = "RSVP Instructions";
    text.innerHTML = `
      1. Enter the venue address, date, and time 
      <a id="bubbleHere">here</a>; 
      2. Select the guests you would like to send your RSVP; 
      3. Tap “Send Email & SMS”.
    `;
  }

  setTimeout(() => {
    const link = qs("#stdHere, #bubbleHere");
    if (link) {
      link.classList.add("pulse");
      link.style.cursor = "pointer";
      link.style.color = "#0e5bd8";
      link.innerHTML = `here <span style="margin-left:2px;">📅</span>`;
    }
  }, 0);
}

// =========================
// LOAD GUESTS (local)
// =========================
let guests = [];

async function loadGuestsLocal() {
  const tbody = qs("#guestTable tbody");
  const empty = qs("#guestEmpty");

  const { data } = await supabase
    .from("guests")
    .select("*")
    .eq("token", token)
    .order("created_at");

  guests = data || [];

  tbody.innerHTML = "";

  if (!guests.length) {
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";

  guests.forEach((g, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input type="checkbox" class="rowCheck" data-id="${g.id}"></td>
      <td>${i + 1}</td>
      <td>${g.first_name}</td>
      <td>${g.last_name}</td>
      <td>${g.email}</td>
      <td>${g.phone}</td>
    `;
    tbody.appendChild(tr);
  });
}

// =========================
// TEMPLATE PREVIEW
// =========================
async function renderPreview() {
  const couple = await loadCouple();
  const coupleName = couple ? `${couple.bride} & ${couple.groom}` : "The couple";
  const location   = couple?.location || "Your city";

  qs("#tplName").textContent = tplId.toUpperCase();
  qs("#channelLabel").textContent = method === "email" ? "Email" : "SMS";

  const EMAIL_TPL    = window.EMAIL_TPL;
  const EMAIL_IMAGES = window.EMAIL_IMAGES;
  const SMS_TPL      = window.SMS_TPL;

  if (method === "email") {
    const fn = EMAIL_TPL[type]?.[tplId];
    const { subject, html } = fn({ couple: coupleName, location, token });

    qs("#subjectText").textContent = subject;

    // Inject footer
    const htmlWithFooter = await applyFooter(html);

    const img = EMAIL_IMAGES[tplId];
    qs("#emailBodyInner").innerHTML =
      (img ? `<img src="${img}" style="width:100%;max-width:600px;border-radius:14px;margin-bottom:0px;">` : "")
      + htmlWithFooter;

    qs("#emailPreview").style.display = "block";
    qs("#smsPreview").style.display = "none";
    qs("#subjectRow").style.display = "block";
  }

  else {
    const fn = SMS_TPL[type]?.[tplId];
    qs("#smsBody").textContent = fn({ couple: coupleName, location }).text;

    qs("#emailPreview").style.display = "none";
    qs("#smsPreview").style.display = "block";
    qs("#subjectRow").style.display = "none";
  }

  await loadGuestsLocal();
}

// =========================
// EXPORT INIT FUNCTION
// =========================
export async function initPreview() {
  applyGuidelines();
  await renderPreview();
  document.body.classList.add("ready");
}
