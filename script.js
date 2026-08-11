// ========================================
// COUNTDOWN
// ========================================

const target = new Date("2026-10-17T10:00:00+07:00").getTime();

function countdown() {
  const distance = target - Date.now();

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
// OPENING & MUSIC
// ========================================

const opening = document.getElementById("opening");
const music = document.getElementById("music");
const openBtn = document.getElementById("openBtn");
const musicBtn = document.getElementById("musicBtn");

if (openBtn) {
  openBtn.addEventListener("click", function () {

    if (opening) {
      opening.classList.add("hide");
    }

    if (music) {
      music.currentTime = 0;

      music.play().catch(function (error) {
        console.error("Musik gagal diputar:", error);
      });
    }

  });
}

if (musicBtn && music) {
  musicBtn.addEventListener("click", function () {

    if (music.paused) {
      music.play();
    } else {
      music.pause();
    }

  });
}


// ========================================
// COPY REKENING
// ========================================

function copyRekening(nomor) {

  if (!nomor) {
    alert("Nomor rekening tidak ditemukan.");
    return;
  }

  if (navigator.clipboard && window.isSecureContext) {

    navigator.clipboard.writeText(nomor)
      .then(function () {
        alert("Nomor rekening berhasil disalin!");
      })
      .catch(function () {
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

  document.body.appendChild(textarea);

  textarea.focus();
  textarea.select();

  try {
    document.execCommand("copy");
    alert("Nomor rekening berhasil disalin!");
  } catch (error) {
    alert("Gagal menyalin nomor rekening.");
  }

  document.body.removeChild(textarea);
}


// ========================================
// RSVP & WISHES - GOOGLE SHEETS
// ========================================

const RSVP_URL = "https://script.google.com/macros/s/AKfycbzWP4qeM8miPs--fv0PcDNEa4xzDG7aVVbbqBH7jwzuvHLIkMJdO1HsU1kx6_LMJ3NY/exec";

const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {

  rsvpForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const attendance = document.getElementById("attendance").value;
    const guests = document.getElementById("guests").value;
    const message = document.getElementById("message").value.trim();

    if (!name || !attendance || !message) {
      alert("Mohon lengkapi data terlebih dahulu.");
      return;
    }

    const button = rsvpForm.querySelector("button[type='submit']");

    if (button) {
      button.disabled = true;
      button.textContent = "Mengirim...";
    }

    const data = {
      name: name,
      attendance: attendance,
      guests: guests,
      message: message
    };

    try {

      await fetch(RSVP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(data)
      });

      // Tampilkan ucapan di halaman
      const messages = document.getElementById("messages");

      if (messages) {

        const box = document.createElement("div");

        box.className = "message";

        box.innerHTML = `
          <b>${escapeHtml(name)}</b><br>
          <small>${escapeHtml(attendance)} • ${escapeHtml(guests)} tamu</small>
          <p>${escapeHtml(message)}</p>
        `;

        messages.prepend(box);
      }

      alert("Terima kasih! Konfirmasi kehadiran dan ucapan berhasil dikirim. ❤️");

      rsvpForm.reset();

      const guestsInput = document.getElementById("guests");

      if (guestsInput) {
        guestsInput.value = "1";
      }

    } catch (error) {

      console.error("RSVP Error:", error);

      alert("Gagal mengirim RSVP. Silakan coba lagi.");

    } finally {

      if (button) {
        button.disabled = false;
        button.textContent = "Kirim Ucapan";
      }

    }

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
