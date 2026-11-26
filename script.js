const audio = document.getElementById("musica");
const playButton = document.getElementById("playButton");
const musicToggle = document.getElementById("musicToggle");
const musicStatus = document.getElementById("musicStatus");
const soundWave = document.getElementById("soundWave");
const record = document.querySelector(".record");
const audioHint = document.getElementById("audioHint");

async function toggleMusic() {
  if (!audio) return;
  if (audio.paused) {
    try {
      await audio.play();
      playButton.textContent = "Ⅱ";
      playButton.setAttribute("aria-label", "Pausar música");
      musicStatus.textContent = "pausar música";
      soundWave.textContent = "♫";
      record.classList.add("playing");
      audioHint.textContent = "Nossa música está tocando. ♡";
    } catch (error) {
      audioHint.textContent = "Não consegui tocar o arquivo. Confira se musicas/te-devoro.mp3 existe.";
    }
  } else {
    audio.pause();
    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", "Tocar música");
    musicStatus.textContent = "tocar música";
    soundWave.textContent = "♪";
    record.classList.remove("playing");
    audioHint.textContent = "Música pausada. Toque para continuar. ♡";
  }
}

playButton.addEventListener("click", toggleMusic);
musicToggle.addEventListener("click", toggleMusic);
audio.addEventListener("ended", () => {
  playButton.textContent = "▶";
  musicStatus.textContent = "tocar música";
  record.classList.remove("playing");
});

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

function openModal(title, text) {
  modalTitle.textContent = title;
  modalText.textContent = text;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".polaroid, .little-note, .envelope").forEach((item) => {
  item.addEventListener("click", () => openModal(item.dataset.title, item.dataset.text));
});
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalOk").addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target.dataset.close === "true") closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

document.getElementById("surpriseButton").addEventListener("click", () => {
  document.getElementById("finalMessage").textContent = "Você é meu capítulo favorito. ♡";
  for (let i = 0; i < 22; i++) {
    const heart = document.createElement("span");
    heart.textContent = ["♡", "♥", "✿"][Math.floor(Math.random() * 3)];
    heart.style.cssText = `position:fixed;left:${Math.random()*100}vw;top:-25px;z-index:40;color:#bd8284;font-size:${18+Math.random()*18}px;pointer-events:none;transition:transform 3s linear,opacity 3s;`;
    document.body.appendChild(heart);
    requestAnimationFrame(() => heart.style.transform = `translateY(110vh) rotate(${Math.random()*240}deg)`);
    setTimeout(() => heart.style.opacity = "0", 2200);
    setTimeout(() => heart.remove(), 4000);
  }
});
