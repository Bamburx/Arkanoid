const gameElement = document.getElementById('arkanoid-1');

const {
  arena: arenaElement,
  ball: ballElement,
  paddle: paddleElement,
  bricks: bricksElement,
  score: scoreElement,
  lifes: lifesElement
} = [
  ...(gameElement.querySelectorAll('[ref]'))
].reduce(
  (acc, item) => {
    let key = item.getAttribute('ref');
    acc[key] = item;

    return acc;
  },
  {} // akumulator
);

/* let scr = 0;
let lifes = 3; */

const state = {
  get score() {
    return +scoreElement.dataset.score;
  },
  get lifes(){
    return +lifesElement.dataset.lifes;
  },
  set score(value) {
    const newValue = Number(value)
    if (isNaN(newValue)) {
      return;
    }
    scoreElement.dataset.score = newValue;
  },
  set lifes(value){
    const newValue = Number(value)
    if (isNaN(newValue)) {
      return;
    }
    lifesElement.dataset.lifes = newValue
  },
  intervalUID: -1
}


const paddleTop = paddleElement.offsetTop;
const paddleWidth = paddleElement.offsetWidth;
const {
  width: arenaWidth,
  height: arenaHeight,
  left: arenaLeft,
  top: arenaTop
} = arenaElement.getBoundingClientRect();

const ballWidth = ballElement.offsetWidth;

const side = [1,-1]
const randomSide = Math.floor(Math.random() * side.length);
let deltaY = -1;
let deltaX = side[randomSide];

function interval() {
  const offsetTop = ballElement.offsetTop;
  const offsetLeft = ballElement.offsetLeft;
  const {
    right: ballRight,
    left: ballLeft,
    top: ballTop,
    bottom: ballBottom
  } = ballElement.getBoundingClientRect();

  const cornerLT = document.elementFromPoint(
    ballLeft - 1,
    ballTop - 1
  );
  const cornerRT = document.elementFromPoint(
    ballRight - 1,
    ballTop - 1
  );
  const cornerLD = document.elementFromPoint(
    ballLeft - 1,
    ballBottom - 1
  );
  const cornerRD = document.elementFromPoint(
    ballRight - 1,
    ballBottom - 1
  );
const corners = [cornerLT, cornerRT, cornerLD, cornerRD]

function hit(element){ //ball collisions
  let hit = false;
  if (element.classList.contains('brick'))  { //brick
    element.classList.add('hide');
    state.score += +element.dataset.score;
    deltaY *= -1;
    hit = true;
  }

  if (element.classList.contains('paddle')) { //paddle
    deltaY *= -1;
    hit = true;
  }
  return hit
}

function bounds(){
  for (const corner of corners) {
    if (hit(corner)) break;
  }
}
bounds()

  if ((arenaHeight - ballWidth) <= offsetTop) {
    state.lifes -= 1;
    reset();
    return;
  } // life -1
console.log('branch 1')
console.log('branch 1')
console.log('branch 1')

  if (state.lifes < 1){
    clearInterval(state.intervalUID);
    paddleElement.removeEventListener('mousedown', onStart)
    alert('GAME OVER')
  }//GAME OVER

  if (offsetTop <= 0) {
    deltaY *= -1;
  } // colision with top

  if (offsetLeft <= 0 || (arenaWidth - ballWidth) <= offsetLeft) {
    deltaX *= -1;
  }// colision with sides

  ballElement.style.top = `${offsetTop + deltaY}px`;
  ballElement.style.left = `${offsetLeft + deltaX}px`;
  // ball position change
  
  const allBricks = bricksElement.children;
  const checkHide = (el) => el.classList.contains('hide')
  let allHiden = true;

  for (const brick of allBricks){
    if(!checkHide(brick)){
      allHiden = false;
      break;
    }
  }

  if (allHiden) {
    alert('YOU WIN')
    reset();
    return;
  }
}

const paddleMove = function (min = 0, max = arenaWidth - paddleWidth) {
  return function (e) {
    const x = Math.min(max, Math.max(min, e.pageX - arenaLeft - (paddleWidth/2))) /// boundary for paddle
    paddleElement.style.left = `${x}px` // paddle move
  }
}

const onMove = paddleMove()

const onStart = function (e) {
  e.stopPropagation();
  document.addEventListener('mousemove', onMove)

  const ballSpeed = 100
  state.intervalUID = setInterval(interval, ballSpeed)
}

document.addEventListener('mouseup', function (e) {
  document.removeEventListener('mousemove', onMove);
  clearInterval(state.intervalUID);
})

const scoreList = [1, 3, 5]


const bricksHTML = Array.from(new Array(30), (item) => {
  const randomIndex = Math.floor(Math.random() * scoreList.length);
  const brickScore = scoreList[randomIndex]

  return `<div class="brick" data-score="${brickScore}"></div>`
}).join('')

bricksElement.innerHTML = bricksHTML;

init()

function init() { 
  const side = [1,-1]
  const randomSide = Math.floor(Math.random() * side.length);
  let deltaY = -1;
  let deltaX = side[randomSide];

  paddleElement.style.left = `${(arenaWidth - paddleWidth) / 2}px`

  Object.assign(ballElement.style, {
    left: `${(arenaWidth - ballWidth) / 2}px`,
    top: `${paddleTop - ballWidth}px`
  })

  paddleElement.addEventListener('mousedown', onStart)
}

function reset() {
  clearInterval(state.intervalUID);
  paddleElement.removeEventListener('mousedown', onStart)
  init();
}

