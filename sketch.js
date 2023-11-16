let questionText = "ask the Internet";
let x = 40, y = 40;
let n = 3;
let numSentences = 3;

let markov;
let source;
let displayText = [""];

var w = window.innerWidth;
var h = window.innerHeight;
let fontSize = 30;
let incrementValue = 0.40
let counter = 1;

function preload() {
  source = loadStrings('source.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 82, 0);
  markov = RiTa.markov(n);
  // load text into the model
  markov.addText(source.join(' '));
}

function draw(){
  fill(0);
  textSize(18)
  button = createButton('plant here');
  button.position(50,  windowHeight-100);
  button.style('font-size', '50px', 'color', '#ffffff');
  button.mousePressed(generateText);

  if(counter >= 6){
    button = createButton('reset');
    button.position(windowWidth-100,  windowHeight-100);
    button.style('font-size', '20px', 'color', '#ffffff');
    button.mousePressed(reset);
  }

  // create a markov model w' n=4
}

function drawText() {
  fill(255, 255, 255);
  textSize(fontSize*(counter*incrementValue));
  text(displayText.join(' '), 0, 0, windowWidth + 300, windowHeight);
}

function generateText() {
  displayText = markov.generate(numSentences);
  counter++;
  drawText();
}

function reset() {
  clear();
  background(0, 82, 0);
  fontSize = 30;
  incrementValue = 0.5
  counter = 1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}