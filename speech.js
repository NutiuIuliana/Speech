// Asigură-te că browserul suportă recunoașterea vocală
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (window.SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'ro-RO'; // Setăm limba la română
    let recognition_started = false;

    // Atribuim evenimentul de click și touch pe imaginea cu ID-ul "image"
    document.getElementById('image').addEventListener('touchstart', toggle_recognition);
    document.getElementById('image').addEventListener('mousedown', toggle_recognition);

    // Funcția care alternează între pornirea și oprirea recunoașterii vocale
    function toggle_recognition() {
        if (!recognition_started) {
            // Pornim recunoașterea vocală
            document.getElementById('text').textContent = 'Recunoașterea vocală a început...';
            recognition.start();
            recognition_started = true;
        } else {
            // Oprim recunoașterea vocală
            recognition.stop();
            document.getElementById('text').textContent = 'Recunoașterea vocală s-a oprit. Așteptăm rezultatele...';
            recognition_started = false;
        }
    }

    // Când recunoașterea se încheie, resetăm starea
    function onend() {
        recognition_started = false;
    }

    recognition.onend = onend;
    recognition.onsoundend = onend;
    recognition.onspeechend = onend;

    // Gestionăm rezultatele recunoașterii
    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        const confidence = event.results[0][0].confidence;

        document.getElementById('text').innerHTML += `Ați rostit cuvântul: ${transcript}, acuratețe: ${confidence.toFixed(2)}<br>`;
    };

    // Gestionăm eventualele erori
    recognition.onerror = function (event) {
        document.getElementById('text').textContent = `Eroare: ${event.error}`;
        recognition_started = false;
    };
} else {
    document.getElementById('text').textContent = 'Recunoașterea vocală nu este suportată în acest browser.';
}
