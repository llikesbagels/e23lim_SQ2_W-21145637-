//Elle Lim
//side quest 2 
//21145637


const GRAVITY = 0.6; // downward force added to vy every frame

let blobT = 0;

const PLATFORM_COLOR = [255, 160, 50]; // warm orange


let platforms = [
  { x: 0,   y: 410, w: 800, h: 40, color: PLATFORM_COLOR },
  { x: 80,  y: 310, w: 120, h: 16, color: PLATFORM_COLOR },
  { x: 280, y: 240, w: 140, h: 16, color: PLATFORM_COLOR },
  { x: 100, y: 200, w: 120, h: 16, color: PLATFORM_COLOR },
  { x: 200, y: 150, w: 100, h: 16, color: PLATFORM_COLOR },
  { x: 400, y: 320, w: 110, h: 16, color: PLATFORM_COLOR },
  { x: 200, y: 290, w: 130, h: 16, color: PLATFORM_COLOR },

  { x: 300, y: 100, w: 200, h: 20, color: PLATFORM_COLOR }
];



let player = {
  x: 100,
  y: 100,

  vx: 0, // horizontal velocity
  vy: 0, // vertical velocity

  r: 20, // visual radius for blob drawing and collision

 
  speed: 0.55,    // horizontal acceleration per frame
  maxSpeed: 4.5,  // maximum horizontal speed
  jumpForce: -12, // upward velocity applied when jumping (negative = upward)
  friction: 0.78, // horizontal slowdown when no key is pressed (0–1, lower = more friction)

  onGround: false, // tracks whether the player is standing on something
};


function preload() {
   celesteback = loadImage("libraries/assets/celestebackground.jpg");

  
  avatar = loadImage("libraries/assets/Celeste-Game-PNG-Background-Image.png");
  
  changeback = loadImage("libraries/assets/bigboy.png");
}

function setup() {
  createCanvas(800, 450);

  // Place player on top of the ground platform (index 0 in the array)
  player.y = platforms[0].y - player.r;
}

function draw() {
  background(celesteback);

  handleInput();
  applyPhysics();
  resolvePlatformCollisions();

  drawPlatforms();
  drawPlayer();
  drawHUD();

  

  blobT += 0.015; // advance blob wobble animation each frame
}


function handleInput() {
  // --- Horizontal movement ---
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // LEFT or A
    player.vx -= player.speed;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // RIGHT or D
    player.vx += player.speed;
  }

  player.vx = constrain(player.vx, -player.maxSpeed, player.maxSpeed);

  if (
    !keyIsDown(LEFT_ARROW) &&
    !keyIsDown(65) &&
    !keyIsDown(RIGHT_ARROW) &&
    !keyIsDown(68)
  ) {
    player.vx *= player.friction;
  }


  if ((keyIsDown(UP_ARROW) || keyIsDown(87)) && player.onGround) { // UP or W
    player.vy = player.jumpForce;
    player.onGround = false;
  }
}


function applyPhysics() {
  // 1. Apply gravity — pulls the player down every frame
  player.vy += GRAVITY;

  // 2. Move player by its current velocity
  player.x += player.vx;
  player.y += player.vy;

  // 3. Keep player inside canvas horizontally
  player.x = constrain(player.x, player.r, width - player.r);

  // 4. If player falls below the canvas, reset to start position
  if (player.y > height + 100) {
    player.x = 100;
    player.y = platforms[0].y - player.r;
    player.vx = 0;
    player.vy = 0;
  }

  player.onGround = false;
}

function resolvePlatformCollisions() {
  for (let i = 0; i < platforms.length; i++) {
    let p = platforms[i];

    let playerLeft   = player.x - player.r;
    let playerRight  = player.x + player.r;
    let playerBottom = player.y + player.r;

    let platLeft  = p.x;
    let platRight = p.x + p.w;
    let platTop   = p.y;

    let overlapsHorizontally =
      playerRight > platLeft && playerLeft < platRight;

    let landingOnTop =
      player.vy >= 0 &&
      playerBottom >= platTop &&
      playerBottom <= platTop + 20;

    if (overlapsHorizontally && landingOnTop) {
  player.y = platTop - player.r;
  player.vy = 0;
  player.onGround = true;

//NEW THING HERE
  if (i === 7) {       
    platforms[7].color = [255, 0, 0]; //red
  }}

  }
}


function drawPlatforms() {
  noStroke();

  for (let i = 0; i < platforms.length; i++) {
    let p = platforms[i];
    fill(p.color[0], p.color[1], p.color[2]);
    rect(p.x, p.y, p.w, p.h, 6);
  }
}


// ------------------------------------------------------------
function drawPlayer() {
  push(); // save current drawing settings

  image(avatar, player.x - player.r, player.y - player.r, player.r * 2, player.r * 2);

  pop(); // restore drawing settings
}

function drawHUD() {
  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT);
  text("Move: Arrow Keys or WASD   Jump: W or Up Arrow", 16, 24);
}
