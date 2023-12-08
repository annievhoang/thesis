let questionText = "ask the Internet";
let x = 40, y = 40;
let n = 3;
let numSentences = 4;

let markov;
let source;
let displayText = [""];

var w = window.innerWidth;
var h = window.innerHeight;
let fontSize = 30;
let incrementValue = 0.45
let counter = 1;
let playFlag = false;
let lastDone = 0;
const delay = 300 //ms
let delayFlag = false;


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
  button.mousePressed(playButton);
  if(playFlag){
    if(!delayFlag){
      drawText();
      delayFlag = true;
      lastDone = millis();
    }else {
      if(millis() - lastDone > delay){
        delayFlag = false;
      }
    }
  }

  if(counter >= 45){
    fill(255)
    rect(0,0, windowWidth, windowHeight);
    button = createButton('reset');
    button.position(windowWidth-100,  windowHeight-100);
    button.style('font-size', '20px', 'color', '#ffffff');
    button.mousePressed(reset);
  }

}

function drawText() {
  displayText = markov.generate(numSentences);
  counter++;
  fill(255, 255, 255);
  textSize(fontSize*(counter*incrementValue));
  text(displayText.join(' '), 0, (counter*-5), windowWidth + 300, windowHeight + 300);
}

function playButton() {
  playFlag = true;
}

function reset() {
  clear();
  background(0, 82, 0);
  fontSize = 30;
  incrementValue = 0.45
  counter = 1;
  delayFlag = false;
  playFlag = false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}