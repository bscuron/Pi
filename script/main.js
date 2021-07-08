let canvas;
let diameter;
let pi = '';
let points = [];
let inner = 0;
let total = 0;

function setup(){
    canvas = createCanvas(windowWidth * 0.75, windowHeight * 0.75);
    canvas.parent('canvas');
    diameter = min(width, height);
}

function draw(){
    background(255);
    translate(width/2, height/2);
    addPoints(100);
    drawSquare();
    drawCircle();
    drawPoints();
    updatePi();
    textSize(width/9);
    text(pi, -width/2, 0);
    deletePoints();
}

// delete old points if the canvas gets too crowded (for performance)
function deletePoints(){
    while(points.length > (height + width) / 1.25){
        points.shift();
    }

}

function updatePi(){
    pi = 4 * inner/total;
}

function drawPoints(){
    for(let p of points){
        push();

        // color the point green if inside the circle
        if(p.inCircle)
            stroke(0, 255, 0);

        // color the point red if outside the circle
        else
            stroke(255, 0, 0);

        strokeWeight((width + height) / 400);
        point(p.x, p.y);
        pop();
    }
}

function addPoints(n){
    for(let i = 0; i < n; i++){
        let rx = Math.random() * (diameter/2 + diameter/2) - diameter/2;
        // let rx = (Math.random() * diameter) - diameter/2;
        // let ry = (Math.random() * diameter) - diameter/2;
        let ry = Math.random() * (diameter/2 + diameter/2) - diameter/2;
        let point = new Point(rx, ry);
        points.push(point);
    }
}

function drawCircle(){
    push();
    fill(255, 255, 255);
    stroke(255, 255, 255);
    ellipse(0, 0, diameter);
    pop();
}

function drawSquare(){
    push();
    fill(225, 225, 225);
    noStroke();
    rectMode(CENTER);
    rect(0, 0, diameter, -diameter);
    pop();
}

// receives 2 values, returns the value that is less than the other
// if the two values are equal, return the first value (does not matter really)
function min(a, b){
    return a <= b ? a : b;
}

class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.dist = dist(0, 0, this.x, this.y);
        this.inCircle = this.dist < diameter/2 ? true : false;

        if(this.inCircle)
            inner++;

        total++;
    }
}

function windowResized(){
    resizeCanvas(windowWidth * 0.75, windowHeight * 0.75);
    diameter = min(width, height);
}
