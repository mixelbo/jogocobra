import { onCobra, expandCobra } from './cobra.js'
import { randomGridPosition } from './grid.js'

let fruta = getRandomFrutaPosition()
const EXPANSION_RATE = 2

export function update() {
  if (onCobra(fruta)) {
    expandCobra(EXPANSION_RATE)
    fruta = getRandomFrutaPosition()
  }
}

export function draw(gameBoard) {
  const frutaElement = document.createElement('div')
  frutaElement.style.gridRowStart = fruta.y
  frutaElement.style.gridColumnStart = fruta.x
  frutaElement.classList.add('fruta')
  gameBoard.appendChild(frutaElement)
}

function getRandomFrutaPosition() {
  let newFrutaPosition
  while (newFrutaPosition == null || onCobra(newFrutaPosition)) {
    newFrutaPosition = randomGridPosition()
  }
  return newFrutaPosition
}