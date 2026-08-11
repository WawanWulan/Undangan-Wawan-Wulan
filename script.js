const opening = document.getElementById("opening");
const music = document.getElementById("music");
const openBtn = document.getElementById("openBtn");
const musicBtn = document.getElementById("musicBtn");
const target = new Date("2026-10-17T10:00:00+07:00").getTime();

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
