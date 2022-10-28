let canvases = document.getElementsByTagName('canvas')
let canvas1 = document.getElementById('canvas1')
let canvas2 = document.getElementById('canvas2')

let pageWidth = window.innerWidth
let pageHeight = window.innerHeight
let canvWidth = pageWidth * 1.2
let canvHeight = pageHeight * 1.2

let numDots = Math.round(pageWidth * pageHeight / 400)

let maxRad = 10
let maxRot = 5
let rotVal

let xVals = []
let yVals = []
let rVals = []

let followMouse = false

for (let i = 0; i < numDots; i++) {
    xVals.push(Math.round(Math.random() * canvWidth))
    yVals.push(Math.round(Math.random() * canvHeight))
    rVals.push(Math.round(Math.random() * maxRad))
}

Array.from(canvases).forEach(c => {
    var ctx = c.getContext('2d');
    c.width = canvWidth
    c.height = canvHeight
    for (let i = 0; i < numDots; i++) {
        ctx.beginPath()
        ctx.arc(xVals[i], yVals[i], rVals[i], 0, 2 * Math.PI)
        ctx.fill()
    }
})

function randomRot(element, mouseLoc = null) {
    if (!followMouse) {
        rotVal = Math.random() * maxRot
        if (rotVal < 1) {
            rotVal = 1
        }
        rotVal = Math.random() < .5 ? rotVal * -1 : rotVal
        element.style.transform = `rotate(${rotVal}deg)`
    }
    if (mouseLoc != null) {
        element.style.transformOrigin = `${mouseLoc[0]}% ${mouseLoc[1]}%`
    }
}

randomRot(canvas2)

function mouseClick(e) {
    if (!followMouse) {
        let clickLoc = [
            (e.clientX + ((canvWidth - pageWidth) / 2)) / canvWidth * 100,
            (e.clientY + ((canvHeight - pageHeight) / 2)) / canvHeight * 100,
        ]
        randomRot(canvas2, clickLoc)
    }
}

function mouseMove(e) {
    if (followMouse) {
        let clickLoc = [
            (e.clientX + ((canvWidth - pageWidth) / 2)) / canvWidth * 100,
            (e.clientY + ((canvHeight - pageHeight) / 2)) / canvHeight * 100,
        ]
        randomRot(canvas2, clickLoc)
    }
}

function scrollRot(e) {
    if (followMouse) {
        if (e.deltaY > 0 && rotVal < 5) {
            rotVal += .25
        } else if (e.deltaY < 0 && rotVal > -5) {
            rotVal -= .25
        }
        canvas2.style.transform = `rotate(${rotVal}deg)`
    }
    console.log(rotVal)
}

function toggleMode(e) {
    if (e.code === 'Space') {
        followMouse = !followMouse
    }
    if (followMouse) {
        canvas2.classList.remove('trans')
    } else {
        canvas2.classList.add('trans')
    }
}

document.addEventListener('click', mouseClick)

document.addEventListener('keyup', toggleMode)

document.addEventListener('mousemove', mouseMove)

document.addEventListener('wheel', scrollRot)
