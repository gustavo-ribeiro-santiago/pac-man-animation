var pos = 0;
const pacArray = [
  ['PacMan1.png', 'PacMan2.png'],
  ['PacMan3.png', 'PacMan4.png']
];
var direction = 0;
const pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale
  }
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled, e.g. {x: 33, y: 21}
  let velocity = setToRandom(20);
  let position = setToRandom(200);
  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = 'PacMan1.png';
  newimg.width = 100;
  // set position and direction
  newimg.style.left = position.x;
  newimg.style.top = position.y;
  newimg.style.transform = "rotate(" + Math.atan(velocity.y / velocity.x)* (180 / Math.PI) + "deg)"
  game.appendChild(newimg);
  // return details in an object
  return {
    position,
    velocity,
    newimg,
    i: 0
  }
}

function update() {
  //loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.newimg.src = pacArray[(item.velocity.x > 0) ? 0 : 1][item.i % 2];
    item.i++;
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  })
  setTimeout(update, 100);
}

function checkCollisions(item) {
  // detect collision with all walls and make pacman bounce
  if (
    item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0
  )
  {
    item.velocity.x = - item.velocity.x; 
    item.newimg.style.transform = "rotate(" + Math.atan(item.velocity.y / item.velocity.x)* (180 / Math.PI) + "deg)";
  }
  if (
    item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
    item.position.y + item.velocity.y < 0
  ) 
  {
    item.velocity.y = - item.velocity.y;
    item.newimg.style.transform = "rotate(" + Math.atan(item.velocity.y / item.velocity.x)*(180 / Math.PI) + "deg)";
  }
}

function makeOne() {
    pacMen.push(makePac()); // add a new PacMan
}