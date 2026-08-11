const opening = document.getElementById("opening");
const music = document.getElementById("music");
const openBtn = document.getElementById("openBtn");
const musicBtn = document.getElementById("musicBtn");
const target = new Date("2026-10-17T10:00:00+07:00").getTime();

function countdown() {
  const now = Date.now();
  const distance = target - now;

  const days = document.getElementById("days");
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");

  // Pastikan elemen countdown tersedia
  if (!days || !hours || !minutes || !seconds) {
    console.error("Elemen countdown tidak ditemukan.");
    return;
  }

  // Jika waktu sudah lewat
  if (distance <= 0) {
    days.textContent = "0";
    hours.textContent = "0";
    minutes.textContent = "0";
    seconds.textContent = "0";
    return;
  }

  const totalSeconds = Math.floor(distance / 1000);

  const d = Math.floor(totalSeconds / 86400);
  const h = Math.floor((totalSeconds % 86400) / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  days.textContent = d;
  hours.textContent = h;
  minutes.textContent = m;
  seconds.textContent = s;
}

countdown();
setInterval(countdown, 1000);

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
          console.log("Musik berhasil diputar");
        })
        .catch((error) => {
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
