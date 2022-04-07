const dino = document.querySelector(".dino");
const background = document.querySelector(".background");

let isJumping = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;
  // subindo
  let upInterval = setInterval(() => {
    if (position >= 200) {
      clearInterval(upInterval);
      // descendo
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
          // descendo
        } else {
          position -= 20;
          dino.style.bottom = position + "px";
        }
      }, 20);
      // subindo
    } else {
      position += 20;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement("div");
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  cactus.classList.add("cactus");
  cactus.style.left = cactusPosition + "px";
  background.appendChild(cactus);

  let leftInverval = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftInverval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftInverval);
      document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + "px";
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener("keydown", handleKeyUp);
