let radius;

function setup(){
    createCanvas(windowWidth, windowHeight);
    radius = min(width, height);
    console.log(radius)
}

function draw(){
    background(0);
}

// receives 2 values, returns the value that is less than the other
// if the two values are equal, return the first value (does not matter really)
function min(a, b){
    return a <= b ? a : b;
}
