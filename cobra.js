import { getInputDirection } from "./input.js"

export const COBRA_VELO = 6
const cobraBody = [{ x: 11, y: 11 }]
let newSegments = 0

export function update() {
  addSegments()

  const inputDirection = getInputDirection()
  for (let i = cobraBody.length - 2; i >= 0; i--) {
    cobraBody[i + 1] = { ...cobraBody[i] }
  }

  cobraBody[0].x += inputDirection.x
  cobraBody[0].y += inputDirection.y
}

export function draw(gameBoard) {
  cobraBody.forEach(segment => {
    const cobraElement = document.createElement('div')
    cobraElement.style.gridRowStart = segment.y
    cobraElement.style.gridColumnStart = segment.x
    cobraElement.classList.add('cobra')
    gameBoard.appendChild(cobraElement)
  })
}

export function expandCobra(amount) {
  newSegments += amount
}

export function onCobra(position, { ignoreHead = false } = {}) {
  return cobraBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false
    return equalPositions(segment, position)
  })
}

export function getCobraHead() {
  return cobraBody[0]
}

export function cobraIntersection() {
  return onCobra(cobraBody[0], { ignoreHead: true })
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    cobraBody.push({ ...cobraBody[cobraBody.length - 1] })
  }

  newSegments = 0
}