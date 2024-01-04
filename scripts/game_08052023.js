const gameElement = document.getElementById('arkanoid-1');

const {
  arena: arenaElement,
  ball: ballElement,
  paddle: paddleElement
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
const arenaWidth = arenaElement.offsetWidth;
const arenaHeight = arenaElement.offsetHeight;
const ballWidth = ballElement.offsetWidth;

paddleElement.style.left = `${(arenaWidth - paddleWidth) / 2}px`

Object.assign(ballElement.style, {
  left: `${(arenaWidth - ballWidth) / 2}px`,
  top: `${paddleTop - ballWidth}px`
})

//console.log('PRZED')

//let tout = setTimeout(() => { console.log('TIMEOUT') }, 0);

// clearTimeout(tout);
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
/* setInterval(() => {
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
}, 10); */
// clearInterval(uid)
// console.log('PO')

/* paddleElement.addEventListener('click', function (e) {
  console.log('CLICK PADDLE 2', e)
}) */

paddleElement.addEventListener('click', function (e) {
  /* e.stopPropagation(); */
  console.log('CLICK PADDLE 1', e)
})

const onArenaClick = function (e) {
  e.stopPropagation();
  console.log('ARENA CLICK', e);
};

arenaElement.addEventListener('click', function () {
  console.log('ARENA -->>>')
})

arenaElement.addEventListener('click', onArenaClick)

arenaElement.removeEventListener('click', onArenaClick);


gameElement.addEventListener('click', function () {
  console.log('GAME CLICK');
})

document.body.addEventListener('click', function () {
  console.log('BODY CLICK');
})

document.documentElement.addEventListener('click', function () {
  console.log('HTML CLICK');
})

document.addEventListener('click', function () {
  console.log('DOCUMENT CLICK');
})

window.addEventListener('click', function () {
  console.log('WINDOW CLICK');
})

/* paddleElement.addEventListener('mouseup', function () {
  console.log('MOUSEUP PADDLE')
})

paddleElement.addEventListener('mousedown', function (e) {
  console.log('MOUSEDOWN PADDLE', e)
}) */


const aHref = document.body.querySelector('a[href*=codeme]');

aHref.addEventListener('click', function (e) {
  e.preventDefault();

  alert(aHref.href);
})
