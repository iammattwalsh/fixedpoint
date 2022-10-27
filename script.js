let canvases = document.getElementsByTagName('canvas')
let canvas2 = document.getElementById('canvas2') 

let pageWidth = window.innerWidth
let pageHeight = window.innerHeight

let numDots = Math.round(pageWidth * pageHeight / 400)

let maxRad = 10
let maxRot = 5

let xVals = []
let yVals = []
let rVals = []

for (let i = 0; i < numDots; i++) {
    xVals.push(Math.round(Math.random() * pageWidth))
    yVals.push(Math.round(Math.random() * pageHeight))
    rVals.push(Math.round(Math.random() * maxRad))
}

Array.from(canvases).forEach(c => {
    var ctx = c.getContext('2d');
    c.width = pageWidth
    c.height = pageHeight
    for (let i = 0; i < numDots; i++) {
        ctx.beginPath()
        ctx.arc(xVals[i], yVals[i], rVals[i], 0, 2 * Math.PI)
        ctx.fill()
    }
})

function randomRot(element, clickLoc = null) {
    let rotVal = Math.random() * maxRot
    if (rotVal < 1) {
        rotVal = 1
    }
    rotVal = Math.random() < .5 ? rotVal * -1 : rotVal
    element.style.transform = `rotate(${rotVal}deg)`
    // console.log(rotVal)
    if (clickLoc != null) {
        element.style.transformOrigin = `${clickLoc[0]}% ${clickLoc[1]}%`
    }
}

randomRot(canvas2)


function logLoc(event) {
    console.log(`x: ${event.clientX} y: ${event.clientY}`)
    console.log(`x: ${event.clientX / pageWidth * 100} y: ${event.clientY / pageHeight * 100}`)
    let clickLoc = [event.clientX / pageWidth * 100, event.clientY / pageHeight * 100]
    randomRot(canvas2, clickLoc)
}

document.addEventListener('click', logLoc)