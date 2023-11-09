const pacArray = [
  ['images/PacMan1.png', 'images/PacMan2.png'],
  ['images/PacMan3.png', 'images/PacMan4.png']
];
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
  // Add image to div id = arena
  let arena = document.getElementById('arena');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = 'images/PacMan1.png';
  newimg.width = 100;
  // set position and direction of image
  newimg.style.left = position.x;
  newimg.style.top = position.y;
  newimg.style.transform = "rotate(" + Math.atan(velocity.y / velocity.x)* (180 / Math.PI) + "deg)"
  arena.appendChild(newimg);
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
  arenaHeight = document.getElementById("arena").getBoundingClientRect().height;
  arenaWidth = document.getElementById("arena").getBoundingClientRect().width;
  if (
    item.position.x + item.velocity.x + item.newimg.width >= arenaWidth ||
    item.position.x + item.velocity.x < 0
  )
  {
    item.velocity.x = - item.velocity.x; 
    item.newimg.style.transform = "rotate(" + Math.atan(item.velocity.y / item.velocity.x)* (180 / Math.PI) + "deg)";
  }
  if (
    item.position.y + item.velocity.y + item.newimg.height >= arenaHeight ||
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