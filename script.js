// Alarm sound variables
let alarmAudioContext = null;
let alarmOscillator = null;
let alarmGain = null;
let alarmInterval = null;

function startAlarm() {

    if (alarmOscillator) return;

    const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) return;

    alarmAudioContext = new AudioContextClass();

    alarmOscillator = alarmAudioContext.createOscillator();
    alarmGain = alarmAudioContext.createGain();

    alarmOscillator.type = "square";
    alarmOscillator.frequency.value = 850;

    alarmGain.gain.value = 0;

    alarmOscillator.connect(alarmGain);
    alarmGain.connect(alarmAudioContext.destination);

    alarmOscillator.start();

    if (alarmAudioContext.state === "suspended") {
        alarmAudioContext.resume();
    }

    let beep = false;

    alarmInterval = setInterval(() => {
        beep = !beep;

        alarmGain.gain.setTargetAtTime(
            beep ? 0.08 : 0,
            alarmAudioContext.currentTime,
            0.02
        );
    }, 350);
}

function stopAlarm() {

    if (alarmInterval) {
        clearInterval(alarmInterval);
        alarmInterval = null;
    }

    if (alarmOscillator) {
        alarmOscillator.stop();
        alarmOscillator.disconnect();
        alarmOscillator = null;
    }

    if (alarmGain) {
        alarmGain.disconnect();
        alarmGain = null;
    }

    if (alarmAudioContext) {
        alarmAudioContext.close();
        alarmAudioContext = null;
    }
}
