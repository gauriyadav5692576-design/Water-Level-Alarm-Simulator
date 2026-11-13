document.addEventListener("DOMContentLoaded", function () {

    // Get HTML elements
    const levelSlider = document.getElementById("level");
    const water = document.getElementById("water");
    const percentage = document.getElementById("percentage");
    const statusText = document.getElementById("status");
    const alarmText = document.getElementById("alarm");
    const resetButton = document.getElementById("reset");

    // Check whether all elements exist
    if (!levelSlider || !water || !percentage ||
        !statusText || !alarmText || !resetButton) {
        console.error("Some HTML elements are missing!");
        return;
    }

    // Audio variables
    let audioContext = null;
    let oscillator = null;
    let gainNode = null;
    let beepInterval = null;

    // Start buzzer
    function startAlarm() {

        if (oscillator) return;

        const AudioClass =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioClass) return;

        audioContext = new AudioClass();

        oscillator = audioContext.createOscillator();
        gainNode = audioContext.createGain();

        oscillator.type = "square";
        oscillator.frequency.value = 800;

        gainNode.gain.value = 0;

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();

        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        let beep = false;

        beepInterval = setInterval(function () {

            beep = !beep;

            gainNode.gain.setTargetAtTime(
                beep ? 0.08 : 0,
                audioContext.currentTime,
                0.02
            );

        }, 400);
    }

    // Stop buzzer
    function stopAlarm() {

        clearInterval(beepInterval);
        beepInterval = null;

        if (oscillator) {
            oscillator.stop();
            oscillator.disconnect();
            oscillator = null;
        }

        if (gainNode) {
            gainNode.disconnect();
            gainNode = null;
        }

        if (audioContext) {
            audioContext.close();
            audioContext = null;
        }
    }

    // Update water level
    function updateWaterLevel() {

        const level = Number(levelSlider.value);

        water.style.height = level + "%";
        percentage.textContent = level + "%";

        if (level < 40) {

            statusText.textContent = "LOW";
            statusText.style.color = "#22c55e";

            alarmText.textContent = "OFF";
            alarmText.style.color = "#22c55e";

            water.style.background =
                "linear-gradient(#38bdf8, #0369a1)";

            stopAlarm();

        } else if (level < 80) {

            statusText.textContent = "MEDIUM";
            statusText.style.color = "#facc15";

            alarmText.textContent = "OFF";
            alarmText.style.color = "#22c55e";

            water.style.background =
                "linear-gradient(#facc15, #ca8a04)";

            stopAlarm();

        } else {

            statusText.textContent = "HIGH";
            statusText.style.color = "#ef4444";

            alarmText.textContent = "ON";
            alarmText.style.color = "#ef4444";

            water.style.background =
                "linear-gradient(#ef4444, #b91c1c)";

            startAlarm();
        }
    }

    // Slider event
    levelSlider.addEventListener("input", updateWaterLevel);

    // Reset event
    resetButton.addEventListener("click", function () {

        levelSlider.value = 0;
        updateWaterLevel();

    });

    // Initial update
    updateWaterLevel();

});
