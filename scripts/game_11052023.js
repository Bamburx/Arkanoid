const gameElement = document.getElementById('arkanoid-1');

const {
  arena: arenaElement,
  ball: ballElement,
  paddle: paddleElement,
  bricks: bricksElement,
  score: scoreElement
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

let scr = 0;
let lifes = 3;

const state = {
  get score() {
    return +scoreElement.dataset.score;
  },
  set score(value){
    const newValue = Number(value)

    if (isNaN(newValue)) {
      return;
    }
    
    scoreElement.dataset.score = newValue;
  },
  lifes: 3,
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

paddleElement.style.left = `${(arenaWidth - paddleWidth) / 2}px`

Object.assign(ballElement.style, {
  left: `${(arenaWidth - ballWidth) / 2}px`,
  top: `${paddleTop - ballWidth}px`
})

let deltaY = -1;
let deltaX = -1;

function interval() {
  const offsetTop = ballElement.offsetTop;
  const offsetLeft = ballElement.offsetLeft;

  const element = document.elementFromPoint(
    arenaLeft + offsetLeft - 1, 
    arenaTop + offsetTop - 1);
    
  if (element.classList.contains('brick')) {
    element.classList.add('hide');
    state.score += 1;
    deltaY *= -1;
  }

  if ((arenaHeight - ballWidth) <= offsetTop) {
    clearInterval.state.intervalUID
  }

  if (offsetTop <= 0)   {
    deltaY *= -1;
  }

  if (offsetLeft <= 0 || (arenaWidth - ballWidth) <= offsetLeft) {
    deltaX *= -1;
  }

  ballElement.style.top = `${offsetTop + deltaY}px`;
  ballElement.style.left = `${offsetLeft + deltaX}px`;
}



/* const onMove = (e) => {
  console.log('MOUSEMOVE', this)
}

const onMove = function (e) {
  console.log('MOUSEMOVE', this)
}
 */

const createOnMove = function (min = 0, max = arenaWidth - paddleWidth) {
  /* const min = 0;
  const max = arenaWidth - paddleWidth; */

  return function (e) {
    const x = Math.min(max, Math.max(min, e.pageX - arenaLeft))
    paddleElement.style.left  = `${x}px`
  }
}

const onMove = createOnMove(/* 30, 400 */)

paddleElement.addEventListener('mousedown', function (e) {
  e.stopPropagation();
  console.log('MOUSEDOWN', e)

  state.intervalUID = setInterval(interval, 10)

  document.addEventListener('mousemove', onMove)
})

paddleElement.addEventListener('mouseup', function (e) {
  document.removeEventListener('mousemove', onMove);
})

const brick = document.createElement('div')
brick.style.backgroundColor = '#c00'
brick.classList.add('brick')

bricksElement.appendChild(brick)

const bricksHTML = '<div class="brick"></div>'.repeat(30)

// bricksElement.insertAdjacentHTML('beforeEnd', bricksHTML)
bricksElement.innerHTML = bricksHTML;
