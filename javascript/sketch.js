let isPressed = false;
let val;

let synth;
let playing, note;
let seq;
let seq1, seq2;

function setup() {
canvas = createCanvas(windowWidth, windowHeight);
canvas.parent("sketch-container");
addGUI();

const lfilter = new Tone.Filter({
  frequency: 500,
  type: 'lowpass',
  rolloff: -48
}).toDestination();

synth = new Tone.Synth({
  volume: -12
}).connect(lfilter);

const reverb = new Tone.Reverb({
  wet: 0.5,
  decay: 5
}).toDestination();

lfilter.connect(reverb);

seq1 = ["C4", ["E4", 0, "E4"], "G4", ["A4", "G4"]];

seq = new Tone.Sequence((time, note) => {
	synth.triggerAttackRelease(note, 0.1, time);
	// subdivisions are given as subarrays
}, seq1).start(0);

Tone.Transport.bpm.value = 80;

}

function draw() {

val = slider.value();
background(val, 100, 100);
synth.volume.value = val;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function addGUI() {
    button = createButton("PLAY")
    button.addClass("button");
    button.position(width/2 - 75, height/2);
    button.mousePressed(bPress);
  

    slider = createSlider(-80, 12, -12, 1);
    slider.addClass("slider");
    slider.position(width/2 - 75, height/2 + 100);
    //slider.style('width', '80px');
  }

  function bPress() {
    console.log('button pressed')
    if (isPressed) {
      isPressed = false;
      button.html("PLAY");
      Tone.Transport.stop();
      //button.removeClass("inactive");
    } else {
      isPressed = true;
      button.html("STOP");
      Tone.Transport.start();
    }
  }

