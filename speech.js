// Create an instance of webkitSpeechRecognition
var recognition = new webkitSpeechRecognition();
recognition.lang = 'en-US';

// Variables to track recognition state
var recognition_started = false;

// Event listeners for touch and mouse events
document.addEventListener("touchstart", on_touch);
document.addEventListener("mousedown", on_touch);

// Function to start speech recognition on touch or mouse down
function on_touch() {
    if (!recognition_started) {
        recognition.start();
        recognition_started = true;
    }
}

// Function to handle the end of recognition
function onend() {
    recognition.stop();
    recognition_started = false;
}

// Set event handlers for recognition events
recognition.onend = onend;
recognition.onsoundend = onend;
recognition.onspeechend = onend;
recognition.onresult = on_results;

// Function to handle results from speech recognition
function on_results(e) {
    var transcript = e.results[0][0].transcript;
    var confidence = e.results[0][0].confidence;

    document.getElementById("text").innerHTML += "You said: " + transcript + ", accuracy: " + confidence.toFixed(2) + "<br>";
}

// Optional: handle errors
recognition.onerror = function(event) {
    console.error("Error occurred in recognition: " + event.error);
};
