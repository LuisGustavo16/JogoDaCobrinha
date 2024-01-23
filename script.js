const mapaElement = document.querySelector('#app #cenario')
const cobraElement = document.getElementById('cobra')
var score = document.querySelector('#app h1')

var velocidadeX = 0
var velocidadeY = 0

var cabecaX = 5
var cabecaY = 5
var direction = 1
var play = false

var corpoCobra = []
var corpo = corpoCobra
var numCorpo = 0
var fruta

function movimentaCabeca () {
    if (play) {
        if (direction == 0 && cabecaX >= 1) {
            cabecaX -= 1
            velocidadeX = -1
            velocidadeY = 0
            cobraElement.style.gridColumn = cabecaX
        } else if (direction == 1 && cabecaX <= 29) {
            cabecaX += 1
            velocidadeX = 1
            velocidadeY = 0
            cobraElement.style.gridColumn = cabecaX
        } else if (direction == 2 && cabecaY >= 1) {
            cabecaY -= 1
            velocidadeY = -1
            velocidadeX = 0
            cobraElement.style.gridRow = cabecaY
        } else if (direction == 3 && cabecaY <= 29) {
            cabecaY += 1
            velocidadeY = 1
            velocidadeX = 0
            cobraElement.style.gridRow = cabecaY
        }
    }
}

function movimentaCorpo () {
    if (play) {
        for (var i = numCorpo - 1; i >= 0; i--) {
            if (i == 0) {
                corpoCobra[0].style.gridColumn = cabecaX
                corpoCobra[0].style.gridRow = cabecaY
            } else {
                corpoCobra[i].style.gridColumn = corpo[i - 1].style.gridColumn
                corpoCobra[i].style.gridRow = corpo[i - 1].style.gridRow
            }
        }
        corpo = corpoCobra
    }
}

function addFruta () {
    const posX = Math.floor(Math.random() * (29) + 1)
    const posY =  Math.floor(Math.random() * (29) + 1)

    fruta = document.createElement('div')
    fruta.classList.add("fruta")
    fruta.style.gridColumn = posX
    fruta.style.gridRow = posY

    mapaElement.appendChild(fruta)
}

function addCorpo () {
    score.textContent = "SCORE: " + numCorpo
    const frutaX = parseInt(fruta.style.gridColumn)
    const frutaY = parseInt(fruta.style.gridRow)
    
    if (cabecaX == frutaX && cabecaY == frutaY){

        const corpo = document.createElement('div')
        corpo.classList.add("corpo")
        corpo.style.gridColumn = cabecaX
        corpo.style.gridRow = cabecaY

        corpoCobra.push(corpo)
        numCorpo += 1
        
        mapaElement.appendChild(corpo)
        mapaElement.removeChild(fruta)
        addFruta()
    }
}

function perdeu () {
    if (cabecaX < 1 || cabecaX > 29 || cabecaY < 1 || cabecaX > 29) {
        play = false
    }
}

document.addEventListener('keydown', function(event) {
        play = true
        if ((event.key == 'A' || event.key == 'a') && velocidadeX != 1) {
            direction = 0
        } else if ((event.key == 'D' || event.key == 'd') && velocidadeX != -1) {
            direction = 1
        } else if ((event.key == 'W' || event.key == 'w') && velocidadeY != 1) {
            direction = 2
        } else if ((event.key == 'S' || event.key == 's') && velocidadeY != -1) {
            direction = 3
        }
})
setInterval(movimentaCabeca, 150)
setInterval(movimentaCorpo, 150)
setInterval(addCorpo, 0)
setInterval(perdeu, 0)
addFruta()
