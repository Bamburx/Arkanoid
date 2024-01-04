const gameElement = document.getElementById('arkanoid-1');

const {
  arena: arenaElement,
  ball: ballElement,
  paddle: paddleElement,
  bricks: bricksElement
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

const paddleTop = paddleElement.offsetTop;
const paddleWidth = paddleElement.offsetWidth;
const {
  width: arenaWidth,
  height: arenaHeight,
  left: arenaLeft
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

  if (offsetTop <= 0 || (arenaHeight - ballWidth) <= offsetTop) {
    deltaY *= -1;
  }
  if (offsetLeft <= 0 || (arenaWidth - ballWidth) <= offsetLeft) {
    deltaX *= -1;
  }

  ballElement.style.top = `${offsetTop + deltaY}px`;
  ballElement.style.left = `${offsetLeft + deltaX}px`;
}

setInterval(interval, 10)

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

  document.addEventListener('mousemove', onMove)
})

paddleElement.addEventListener('mouseup', function (e) {
  document.removeEventListener('mousemove', onMove);
})

const brick = document.createElement('div')
brick.style.backgroundColor = '#c00'
brick.classList.add('brick')

bricksElement.appendChild(brick)

const bricksHTML = '<div></div>'.repeat(30)

// bricksElement.insertAdjacentHTML('beforeEnd', bricksHTML)
bricksElement.innerHTML = bricksHTML;
