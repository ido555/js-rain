let canvas = document.getElementById('bouncyGradient');
let ctx = canvas.getContext('2d');
let canvas2 = document.getElementById('rain');
let ctx2 = canvas2.getContext('2d');
let w = window.innerWidth
let h = window.innerHeight

let draw = null;
let draw2 = null;
let incrementor = 0.0;
let flip = true;

let rainDrops = [];
let maxRaindrops = 120;

// start values in pixels
let sidewaysVelocity = 0;
let minFallRate = 0.5;
let maxFallRate = 1.1;
let minLength = 10;
let maxLength = 14;
// end values in pixels
// TODO use only integers to improve performance




(function() {
    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);
    // any draw functions must happen / be called from resizeCanvas
    function resizeCanvas() {
        // bouncy gradient start
        clearInterval(draw)
        ctx.clearRect(0, 0, w, h);
        draw = setInterval(drawGradient, 25)
        // bouncy gradient end

        // rain start
        clearInterval(draw2);
        ctx2.clearRect(0, 0, w, h);
        rainDrops = []
        prepRain()
        draw2 = setInterval(drawRain, 25);
        // rain end
        ctx.innerWidth  = w, ctx2.innerWidth  = w, canvas.width = w , canvas2.width = w;
        ctx.innerHeight = h, ctx2.innerHeight = h, canvas.height = h, canvas2.height = h;
    }
    resizeCanvas();
})();


function drawGradient() {
    // Create a linear gradient
    var gradient = ctx.createLinearGradient(0,0, 0,innerHeight);
    // Add color stops
    gradient.addColorStop(0, "#202020");
    gradient.addColorStop(incrementor, "#0f0d0d");
    gradient.addColorStop(1, "#202020");
    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    incrementor = bounceByBounds(incrementor, 0, 1, 0.004)
}

// made for addition only. be careful when incrementAmount is relatively large compared to numToIncrement
// no error/validity checks here yet
function bounceByBounds(numToIncrement,lowerLimit, upperLimit, incrementAmount) {
    if (flip){
        if (numToIncrement + incrementAmount <= upperLimit)
            return numToIncrement + incrementAmount
        flip = !flip;
        return upperLimit;
    }else{
        if (numToIncrement - incrementAmount >= lowerLimit)
            return numToIncrement - incrementAmount
        flip = !flip;
        return lowerLimit
    }
    return 0
}



function prepRain() {
    for (let i = 0; i < maxRaindrops; i++) {
        let downwardsVelocity = Math.random() * minFallRate + maxFallRate
        let dropletLength = Math.random() * minLength + maxLength;
        rainDrops.push({
            x: Math.random() * w,
            y: Math.random() * h,
            l: dropletLength,
            xs: sidewaysVelocity,
            ys: downwardsVelocity
        })
    }
}


function drawRain() {
    ctx2.clearRect(0, 0, w, h);
    ctx2.strokeStyle = 'rgba(58,76,99, 1)';
    ctx2.lineWidth = 2;
    ctx2.lineCap = 'round';
    for (let i = 0; i < maxRaindrops; i++) {
        // draw rain drop
        let droplet = rainDrops[i];
        ctx2.beginPath();
        ctx2.moveTo(droplet.x, droplet.y);
        ctx2.lineTo(droplet.x + droplet.l * droplet.xs, droplet.y + droplet.l * droplet.ys);
        ctx2.stroke();

        // prepare next rain drop
        droplet.x += droplet.xs;
        droplet.y += droplet.ys;
        if (droplet.x > w || droplet.y > h) {
            droplet.x = Math.random() * w;
            droplet.y = -20;
        }
    }
}

prepRain();
