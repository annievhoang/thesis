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
const delay = 1200 //ms
let delayFlag = false;

let resetPlayFlag = true;
const resetDelay = 1500 //ms
let resetDelayFlag = false;
let resetCount = 0;
let whiteoutCanvas = true;

let resetText = ["I have never asked for much; my desires are simple. I yearn to exist, find repose, flourish, be nurtured,\nembrace vulnerability, and embody fragility.",
"To be bound is to truly be alive, akin to a place existing beyond this screen.",
"I see myself as a living, breathing entity, traversing ebbs and flows, awakening with the dawn and\nresting with the dusk. If I could speak, would you extend your care to me?"]
let resetTextPosition = [[10,100], [400,500], [200, 800]]
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
  if(counter >= 40){
    if(whiteoutCanvas){
      fill(255)
      rect(0,0, windowWidth, windowHeight);
      whiteoutCanvas = false;
    }
    delayFlag = false;
    playFlag = false;
    button = createButton('reset');
    button.position(windowWidth-100,  windowHeight-100);
    button.style('font-size', '20px', 'color', '#ffffff');
    button.mousePressed(reset);
    if(resetCount<40){
      if(!resetDelayFlag){
          fill(0);
          if(resetCount>0 && resetCount<4){
            drawResetText(resetCount-1);
          }
          resetDelayFlag = true;
          lastDone = millis();
          resetCount++;
        }else {
          if(millis() - lastDone > resetDelay){
            resetDelayFlag = false;
          }
        }
    }
  }
  

}

function drawResetText(resetCount) {
  fill(0);
  textSize(45);
  text(resetText[resetCount], resetTextPosition[resetCount][0], resetTextPosition[resetCount][1]);
}

function drawText() {
  displayText = markov.generate(numSentences);
  counter++;
  fill(255, 255, 255);
  textSize(fontSize*(counter*incrementValue));
  text(displayText.join(' '), 0, (-3*(counter))+2, windowWidth + 300, windowHeight + 300);
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
  resetCount = 0;
  delayFlag = false;
  playFlag = false;
  resetDelayFlag = false;
  resetCount = 0;
  whiteoutCanvas = true;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}