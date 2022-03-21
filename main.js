//Models used: Posenet and MobileNet

//Delcaring the functions
previous_result = "";


function setup() {
  canvas = createCanvas(500, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();

  classifier = ml5.imageClassifier('MobileNet', console.log('Model loaded!'));
}

function draw(){
  image(video, 0, 0, 500, 300);
  classifier.classify(video, gotResult);
}
function gotResult(error, results) {
  if(error){
    console.error(error);
  }
  else{
    if((results[0].confidence > 0.5) && (previous_result != results[0].label)){
      console.log(results);
      document.getElementById('object').innerHTML = "Object: " + results[0].label;
      document.getElementById('expected_accuracy').innerHTML = "Accuracy: " + results[0].confidence;

      synth = window.speechSynthesis;
      speak_data = "Object detected is " + results[0].label;
      utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);
    }
  }
}