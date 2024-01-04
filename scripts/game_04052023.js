const gameElement = document.getElementById('arkanoid-1');

const panelElement = gameElement.querySelector('.panel')

/* const refElements = gameElement.querySelectorAll('[ref]')

const obj = {}; // akumulator

for (let item of refElements) {
  let key = item.getAttribute('ref');
  obj[key] = item;
}

const { ball: ballElement, paddle: paddleElement } = obj; */
// Array.from(refElements).reduce();

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

/*
const ballElement = gameElement.querySelector('[ref=ball]')
const paddleElement = gameElement.querySelector('[ref=paddle]') */

/* ballElement.style.top = '24px'
ballElement.style.left = '24px' */

const paddleTop = paddleElement.offsetTop;
const paddleWidth = paddleElement.offsetWidth;
const arenaWidth = arenaElement.offsetWidth;
const ballWidth = ballElement.offsetWidth;

paddleElement.style.left = `${(arenaWidth - paddleWidth) / 2}px`

/* ballElement.style.left = `${(arenaWidth - ballWidth) / 2}px`
ballElement.style.top = `${paddleTop - ballWidth}px`
 */
Object.assign(ballElement.style, {
  left: `${(arenaWidth - ballWidth) / 2}px`,
  top: `${paddleTop - ballWidth}px`,
  backgroundColor: 'green'
})

console.log('PRZED')
let uid_1 = setTimeout(() => {
  console.log('TOUT 1');
}, 2000)

let uid_2 = setTimeout(() => {
  console.log('TOUT 2');
  clearTimeout(uid_1);
}, 1000)




console.log('PO')
