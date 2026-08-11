// ========================================
// COUNTDOWN
// ========================================

const target = new Date("2026-10-17T10:00:00+07:00").getTime();

function countdown() {
  const now = Date.now();
  const distance = target - now;

  const days = document.getElementById("days");
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");

  if (!days || !hours || !minutes || !seconds) {
    console.error("Elemen countdown tidak ditemukan.");
    return;
  }

  if (distance <= 0) {
    days.textContent = "0";
    hours.textContent = "0";
    minutes.textContent = "0";
    seconds.textContent = "0";
    return;
  }

  days.textContent = Math.floor(distance / 86400000);
  hours.textContent = Math.floor(distance / 3600000) % 24;
  minutes.textContent = Math.floor(distance / 60000) % 60;
  seconds.textContent = Math.floor(distance / 1000) % 60;
}

countdown();
setInterval(countdown, 1000);


// ========================================
// OPENING & MUSIK
// ========================================

const opening = document.getElementById("opening");
const music = document.getElementById("music");
const openBtn = document.getElementById("openBtn");
const musicBtn = document.getElementById("musicBtn");


// Tombol Buka Undangan
if (openBtn) {
  openBtn.addEventListener("click", function () {

    console.log("Tombol Buka Undangan diklik");

    if (opening) {
      opening.classList.add("hide");
    }

    if (music) {
      music.currentTime = 0;

      music.play()
        .then(() => {
          console.log("Musik berhasil diputar.");
        })
        .catch((error) => {
          console.error("Musik gagal diputar:", error);
        });
    }
  });
}


// Tombol Play / Pause Musik
if (musicBtn && music) {
  musicBtn.addEventListener("click", function () {

    if (music.paused) {
      music.play()
        .then(() => {
          console.log("Musik diputar.");
        })
        .catch((error) => {
          console.error("Musik gagal diputar:", error);
        });
    } else {
      music.pause();
    }

  });
}


// ========================================
// COPY NOMOR REKENING
// ========================================

function copyRekening(nomor) {

  if (!nomor) {
    alert("Nomor rekening tidak ditemukan.");
    return;
  }

  if (navigator.clipboard && window.isSecureContext) {

    navigator.clipboard.writeText(nomor)
      .then(() => {
        alert("Nomor rekening berhasil disalin!");
      })
      .catch(() => {
        copyRekeningFallback(nomor);
      });

  } else {

    copyRekeningFallback(nomor);

  }
}


function copyRekeningFallback(nomor) {

  const textarea = document.createElement("textarea");

  textarea.value = nomor;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";

  document.body.appendChild(textarea);

  textarea.focus();
  textarea.select();

  try {

    document.execCommand("copy");
    alert("Nomor rekening berhasil disalin!");

  } catch (error) {

    alert("Gagal menyalin nomor rekening. Silakan salin manual.");

  }

  document.body.removeChild(textarea);
}


// ========================================
// RSVP
// ========================================

const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {

  rsvpForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const nameElement = document.getElementById("name");
    const attendanceElement = document.getElementById("attendance");
    const guestsElement = document.getElementById("guests");
    const messageElement = document.getElementById("message");
    const messagesElement = document.getElementById("messages");

    if (
      !nameElement ||
      !attendanceElement ||
      !guestsElement ||
      !messageElement ||
      !messagesElement
    ) {
      return;
    }

    const name = nameElement.value.trim();
    const attendance = attendanceElement.value;
    const guests = guestsElement.value;
    const message = messageElement.value.trim();

    const box = document.createElement("div");

    box.className = "message";

    box.innerHTML = `
      <b>${escapeHtml(name)}</b><br>
      <small>${escapeHtml(attendance)} • ${escapeHtml(guests)} tamu</small>
      <p>${escapeHtml(message)}</p>
    `;

    messagesElement.prepend(box);

    rsvpForm.reset();

    guestsElement.value = "1";
  });
}


// ========================================
// ESCAPE HTML
// ========================================

function escapeHtml(value) {

  return String(value).replace(/[&<>"']/g, function (character) {

    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[character];

  });

}
