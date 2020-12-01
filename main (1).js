prediction_1 = "";

Webcam.set({
    width : 350,
    height : 300,
    image_format : "png",
    png_quality : 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    })
}

console.log('ml5 version is ',ml5.version);
Classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/lbsdKeGz-/model.json",modelLoaded);

function modelLoaded() 
{
    console.log('model loaded!');
}

function check() {
    img = document.getElementById("captured_image");
    Classifier.classify(img,gotResult);
}

function gotResult(error,results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        if(results[0].label == "amazing"){
            prediction_1 = "This is looking amazing"
            document.getElementById("update_emoji").innerHTML = "&#128076;";  
        }
        else if(results[0].label == "best"){
            prediction_1 = "Best of luck"
            document.getElementById("update_emoji").innerHTML = "&#128077;";  
        }
        else if(results[0].label == "victory"){
            prediction_1 = "That was the marvelous victory"
            document.getElementById("update_emoji").innerHTML = "&#9996;";  
        }
        speak_prediction();
    }
}


function speak_prediction() {
    var synth = window.speechSynthesis;
    speak_data1 = prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data1);
    utterThis.rate = 0.5;
    synth.speak(utterThis);
}