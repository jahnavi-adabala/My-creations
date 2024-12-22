<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Falling Hearts Game</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #fef6f9;
      overflow: hidden;
      font-family: Arial, sans-serif;
    }
    h1 {
      text-align: center;
      color: #ff69b4;
    }

    /* Game container */
    #game-container {
      position: relative;
      width: 100%;
      height: 100vh;
    }

    /* Basket (player) */
    #basket {
      position: absolute;
      bottom: 10px;
      width: 100px;
      height: 50px;
      background-color: #ff69b4;
      border-radius: 25px;
      left: 50%;
      transform: translateX(-50%);
    }

    /* Falling heart */
    #heart {
      position: absolute;
      top: 0;
      width: 40px;
      height: 40px;
      background-color: #ff5f5f;
      clip-path: polygon(
        50% 0%, 
        100% 38%, 
        82% 100%, 
        50% 70%, 
        18% 100%, 
        0% 38%
      );
      left: 50%;
    }

    /* Score Display */
    #score {
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 20px;
      color: #ff69b4;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div id="game-container">
    <div id="score">Score: 0</div>
    <div id="heart"></div>
    <div id="basket"></div>
  </div>

  <script>
    // Get elements
    const basket = document.getElementById('basket');
    const heart = document.getElementById('heart');
    const scoreDisplay = document.getElementById('score');

    // Variables
    let score = 0;
    let basketPosition = 50; // In percentage
    let heartSpeed = 2; // Initial speed of the heart

    // Move the basket with keyboard
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' && basketPosition > 0) {
        basketPosition -= 5; // Move left
        basket.style.left = `${basketPosition}%`;
      }
      if (e.key === 'ArrowRight' && basketPosition < 90) {
        basketPosition += 5; // Move right
        basket.style.left = `${basketPosition}%`;
      }
    });

    // Falling heart animation
    function moveHeart() {
      const heartRect = heart.getBoundingClientRect();
      const basketRect = basket.getBoundingClientRect();

      // Move the heart down
      let heartTop = parseFloat(heart.style.top || '0');
      heartTop += heartSpeed;
      heart.style.top = `${heartTop}px`;

      // Check if the heart reaches the basket
      if (
        heartRect.bottom >= basketRect.top &&
        heartRect.left >= basketRect.left &&
        heartRect.right <= basketRect.right
      ) {
        // Increase score and reset heart position
        score += 1;
        scoreDisplay.textContent = `Score: ${score}`;
        heart.style.top = '0px';
        heart.style.left = `${Math.random() * 90}%`;

        // Increase heart speed every 5 points
        if (score % 5 === 0) {
          heartSpeed += 1;
        }
      }

      // Reset heart position if it falls off screen
      if (heartTop > window.innerHeight) {
        heart.style.top = '0px';
        heart.style.left = `${Math.random() * 90}%`;
      }

      // Request the next animation frame
      requestAnimationFrame(moveHeart);
    }

    
    heart.style.left = `${Math.random() * 90}%`;
    moveHeart();
  </script>
</body>
</html>
