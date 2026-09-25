let esp32IP = "";

function connectESP32() {

    esp32IP = document.getElementById("ipAddress").value.trim();

    if (esp32IP === "") {
        alert("Please enter the ESP32 IP address.");
        return;
    }

    document.getElementById("status").textContent = "Ready";
    document.getElementById("statusDot").style.background = "#2ecc71";

    alert("ESP32 IP saved!");
}


function controlLED(state) {

    if (esp32IP === "") {
        alert("First enter the ESP32 IP address and press Connect.");
        return;
    }

    document.getElementById("lastCommand").textContent =
        state.toUpperCase();

    const url =
        "http://" + esp32IP + "/led?state=" + state;

    fetch(url)
        .then(response => {

            if (!response.ok) {
                throw new Error("ESP32 error");
            }

            document.getElementById("status").textContent =
                "Connected";

            document.getElementById("statusDot").style.background =
                "#2ecc71";

        })

        .catch(error => {

            document.getElementById("status").textContent =
                "Connection Failed";

            document.getElementById("statusDot").style.background =
                "#e74c3c";

            alert(
                "Cannot connect to ESP32.\n\n" +
                "Check:\n" +
                "1. ESP32 is powered ON\n" +
                "2. IP address is correct\n" +
                "3. Phone and ESP32 are on the same Wi-Fi"
            );

        });
}
