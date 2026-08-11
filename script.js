const opening = document.getElementById("opening");
const music = document.getElementById("music");
const openBtn = document.getElementById("openBtn");
const musicBtn = document.getElementById("musicBtn");
const target = new Date("2026-10-17T10:00:00+07:00").getTime();

function countdown() {
  const now = new Date().getTime();
  const distance = target - now;

  const days = document.getElementById("days");
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");

  if (!days || !hours || !minutes || !seconds) {
    console.error("Elemen countdown tidak ditemukan");
    return;
  }

  if (distance <= 0) {
    days.innerHTML = "0";
    hours.innerHTML = "0";
    minutes.innerHTML = "0";
    seconds.innerHTML = "0";
    return;
  }

  days.innerHTML = Math.floor(distance / (1000 * 60 * 60 * 24));
  hours.innerHTML = Math.floor(
    (distance / (1000 * 60 * 60)) % 24
  );
  minutes.innerHTML = Math.floor(
    (distance / (1000 * 60)) % 60
  );
  seconds.innerHTML = Math.floor(
    (distance / 1000) % 60
  );
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
