function start() {
  const playArea = document.querySelector("#game-area");
  const player = document.querySelector("#player");
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

  document.addEventListener("keydown", function (e) {
    game.pressed[e.which] = true;
  });

  document.addEventListener("keyup", function (e) {
    game.pressed[e.which] = false;
  });

  function moveBackgroud() {
    let leftPosition = getComputedStyle(playArea).getPropertyValue(
      "background-position-x"
    );
    let position = parseInt(leftPosition);
    position -= 2;
    playArea.style.backgroundPositionX = `${position}px`;
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
      if (leftPosition === "680px") {
        player.style.left = "680px";
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

      let xPosition = parseInt(
        getComputedStyle(player).getPropertyValue("left")
      );
      let yPosition = parseInt(
        getComputedStyle(player).getPropertyValue("top")
      );

      let laser = document.createElement("div");
      playArea.appendChild(laser);
      laser.classList.add("laser");
      laser.style.left = `${xPosition + 100}px`;
      laser.style.top = `${yPosition - 30}px`;

      let laserInterval = setInterval(moveLaser, 30);

      function moveLaser() {
        let xPosition = parseInt(
          getComputedStyle(laser).getPropertyValue("left")
        );
        laser.style.left = `${xPosition + 30}px`;

        if (xPosition > 700) {
          clearInterval(laserInterval);
          laser.remove();
          canShoot = true;
        }
      }
    }
  }
}

start();
