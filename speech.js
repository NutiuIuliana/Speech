document.addEventListener("touchstart",on_touch); document.addEventListener("mousedown",on_touch);
var recognition = new webkitSpeechRecognition(); 
recognition.lang = 'en-US'; function on_touch()
{
if(recognition.start){ recognition.start(); recognition_started = true;
}
}
function onend()
{
recognition.stop(); recognition_started = false;
}
recognition.onend = onend; recognition.onsoundend = onend; recognition.onspeechend = onend; recognition.onresult =on_results;
 
