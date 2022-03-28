function start() {
  const gameArea = document.querySelector("#gameArea");
  const player = document.querySelector("#player");
  const alienEnemy = [
    "./assets/images/alienEnemy1.png",
    "./assets/images/alienEnemy2.png",
    "./assets/images/alienEnemy3.png",
    "./assets/images/alienEnemy4.png",
    "./assets/images/alienEnemy5.png",
    "./assets/images/alienEnemy6.png",
    "./assets/images/alienEnemy7.png",
    "./assets/images/alienEnemy8.png",
    "./assets/images/alienEnemy9.png",
  ];
  let game = {};
  let KEY = {
    W: 87,
    S: 83,
    D: 68,
    A: 65,
    space: 32,
  };
  game.pressed = [];
  game.timer = setInterval(loop, 30);
  let canShoot = true;
  let velocidade = 0;

  let somDisparo = document.getElementById("somDisparo");
  let somExplosao = document.getElementById("somExplosao");
  let musica = document.getElementById("musica");

  musica.addEventListener(
    "ended",
    function () {
      musica.currentTime = 0;
      musica.play();
    },
    false
  );
  musica.play();

  document.addEventListener("keydown", function (e) {
    game.pressed[e.which] = true;
  });

  document.addEventListener("keyup", function (e) {
    game.pressed[e.which] = false;
  });

  function moveBackgroud() {
    let leftPosition = getComputedStyle(gameArea).getPropertyValue(
      "background-position-x"
    );
    let position = parseInt(leftPosition);
    position -= 2;
    gameArea.style.backgroundPositionX = `${position}px`;
  }

  function loop() {
    moveBackgroud();
    movePlayer();
  }

  function movePlayer() {
    if (game.pressed[KEY.W]) {
      let topPosition = getComputedStyle(player).getPropertyValue("top");
      if (topPosition === "20px") {
        player.style.top = "20px";
      } else {
        let position = parseInt(topPosition);
        position -= 10;
        player.style.top = `${position}px`;
      }
    }

    if (game.pressed[KEY.S]) {
      let topPosition = getComputedStyle(player).getPropertyValue("top");
      if (topPosition === "520px") {
        player.style.top = "520px";
      } else {
        let position = parseInt(topPosition);
        position += 10;
        player.style.top = `${position}px`;
      }
    }

    if (game.pressed[KEY.A]) {
      let leftPosition = getComputedStyle(player).getPropertyValue("left");
      if (leftPosition === "20px") {
        player.style.left = "20px";
      } else {
        let position = parseInt(leftPosition);
        position -= 10;
        player.style.left = `${position}px`;
      }
    }

    if (game.pressed[KEY.D]) {
      let leftPosition = getComputedStyle(player).getPropertyValue("left");
      if (leftPosition === "630px") {
        player.style.left = "630px";
      } else {
        let position = parseInt(leftPosition);
        position += 10;
        player.style.left = `${position}px`;
      }
    }

    if (game.pressed[KEY.space]) {
      shootLaser();
    }
  }

  function shootLaser() {
    if (canShoot == true) {
      canShoot = false;
      somDisparo.play();

      let xPosition = parseInt(
        getComputedStyle(player).getPropertyValue("left")
      );
      let yPosition = parseInt(
        getComputedStyle(player).getPropertyValue("top")
      );

      let laser = document.createElement("div");
      gameArea.appendChild(laser);
      laser.classList.add("laser");
      laser.style.left = `${xPosition + 100}px`;
      laser.style.top = `${yPosition - 30}px`;

      let laserInterval = setInterval(moveLaser, 30);

      function moveLaser() {
        let xPosition = parseInt(
          getComputedStyle(laser).getPropertyValue("left")
        );
        laser.style.left = `${xPosition + 30}px`;

        //

        let aliens = document.querySelectorAll(".alien");
        aliens.forEach((alien) => {
          if (checkCollision(laser, alien)) {
            xPosition = parseInt(
              getComputedStyle(alien).getPropertyValue("left")
            );
            yPosition = parseInt(
              getComputedStyle(alien).getPropertyValue("top")
            );
            alien.remove();
            explosion(xPosition, yPosition);
          }
        });

        //

        if (xPosition > 700) {
          clearInterval(laserInterval);
          laser.remove();
          canShoot = true;
        }
      }
    }
  }

  function createAlien() {
    let newAlien = document.createElement("img");
    let alienSprite = alienEnemy[Math.floor(Math.random() * alienEnemy.length)];
    newAlien.src = alienSprite;
    newAlien.classList.add("alien");
    newAlien.classList.add("animationAlien");
    newAlien.style.left = "710px";
    newAlien.style.top = `${Math.floor(Math.random() * 510 + 20)}px`;
    gameArea.appendChild(newAlien);
    moveAlien(newAlien);
  }

  function moveAlien(alien) {
    let moveAlienInterval = setInterval(() => {
      let xPosition = parseInt(
        getComputedStyle(alien).getPropertyValue("left")
      );
      alien.style.left = `${xPosition - (4 + velocidade)}px`;
      if (xPosition < 30) {
        alien.remove();
        gameOver();
        // if (Array.from(alien.classList).includes("deadAlien")) {}
      }
    }, 30);
  }

  let alienInterval = setInterval(createAlien, 1500);

  function checkCollision(laser, alien) {
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    // let laserBottom = laserTop;

    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBottom = alienTop - 80;

    if (laserLeft + 70 >= alienLeft) {
      // laserLeft <= 700 &&
      if (laserTop <= alienTop && laserTop >= alienBottom) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  function explosion(xPosition, yPosition) {
    somExplosao.play();
    let newExplosion = document.createElement("div");
    gameArea.appendChild(newExplosion);
    newExplosion.classList.add("explosion");
    newExplosion.classList.add("animationExplosion");
    newExplosion.style.left = `${xPosition}px`;
    newExplosion.style.top = `${yPosition}px`;
    let timpeExplosion = setInterval(removeExplosion, 1000);

    function removeExplosion() {
      newExplosion.remove();
      clearInterval(timpeExplosion);
    }
    velocidade += 0.1;
    console.log(velocidade);
  }
}

function startGame() {
  let gameStart = document.getElementById("gameStart");
  gameStart.style.display = "none";
  let player = document.getElementById("player");
  player.style.display = "block";

  start();
}

function gameOver() {
  let gameOver = document.getElementById("gameOver");
  gameOver.style.display = "flex";
}

function restart() {
  let gameOver = document.getElementById("gameOver");
  gameOver.style.display = "none";
  location.reload();
}
