let questionText = "ask the Internet";
let x = 40, y = 40;
let n = 3;
let numSentences = 3;

let markov;
let source;
let displayText = [""];

var w = window.innerWidth;
var h = window.innerHeight;


function preload() {
  source = loadStrings('source.txt');
}

function setup() {
  createCanvas(w, h);
  background(0, 0, 0);
  fill(0);
  textSize(18)
  let inp = createInput(questionText);
  inp.position(50, 450);
  inp.size(200);
  button = createButton('submit');
  button.position(250, 450);
  button.mousePressed(generateText);
  // create a markov model w' n=4
  markov = RiTa.markov(n);
  // load text into the model
  markov.addText(source.join(' '));
  drawText();

}

function drawText() {
  background(0, 82, 0);
  text(displayText.join(' '), x, y, 800, 440);
  textSize(30);
  fill(255, 255, 255);
}

function generateText() {
  displayText = markov.generate(numSentences);
  drawText();
}

window.onresize = function() {

  w = window.innerWidth;
  h = window.innerHeight;
  canvas.size(w,h);
}
