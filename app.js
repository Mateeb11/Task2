const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "ar-SA";

const start = document.querySelector(".start");
const result = document.querySelector(".result");
const button = document.querySelector(".button");

let text = "";

start.addEventListener("click", () => {
    recognition.start();
    result.textContent = "...";

    start.classList.add("listening");
    start.textContent = "Listening....";
});
recognition.onresult = (event) => {
    result.textContent = event.results[0][0].transcript;
    text = event.results[0][0].transcript;
    recognition.stop();
};
recognition.onspeechend = () => {
    start.classList.remove("listening");
    start.textContent = "Start";
};

// here is tha part that connect the webpage to the arm
// i can't test this code because i don't have the arm
const connectButton = document.getElementById("connect");

connectButton.addEventListener("click", async () => {
    try {
        const port = await navigator.serial.requestPort(); //ask the user to connect the arm
        const writer = port.writable.getWriter();
        await writer.write(text); //send the text to .ino file
    } catch (e) {
        console.log(e);
    }
});
