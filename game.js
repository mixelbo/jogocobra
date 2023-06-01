import { update as updateCobra, draw as drawCobra, COBRA_VELO, getCobraHead, cobraIntersection } from './cobra.js'
import { update as updateFruta, draw as drawFruta } from './fruta.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
  if (gameOver) {
    if (confirm('É, você perdeu.')) {
      window.location = '/'
    }
    return
  }


  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / COBRA_VELO) return


  lastRenderTime = currentTime

  update()
  draw()
}

window.requestAnimationFrame(main)

function update() {
  updateCobra()
  updateFruta()
  checkMorte()
}

function draw() {
  gameBoard.innerHTML = ''
  drawCobra(gameBoard)
  drawFruta(gameBoard)
}

function checkMorte() {
  gameOver = outsideGrid(getCobraHead()) || cobraIntersection()
}