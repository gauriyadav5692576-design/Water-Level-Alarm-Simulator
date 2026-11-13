const levelSlider = document.getElementById("level");
const water = document.getElementById("water");
const percentage = document.getElementById("percentage");
const status = document.getElementById("status");
const alarm = document.getElementById("alarm");
const resetButton = document.getElementById("reset");

// Function to update water level
function updateWaterLevel() {

    let level = Number(levelSlider.value);

    // Update tank water
    water.style.height = level + "%";

    // Update percentage
    percentage.textContent = level + "%";

    // Check water level
    if (level < 40) {

        status.textContent = "LOW";
        status.style.color = "#22c55e";

        alarm.textContent = "OFF";
        alarm.style.color = "#22c55e";

        water.style.background = "#38bdf8";

    } 
    else if (level < 80) {

        status.textContent = "MEDIUM";
        status.style.color = "#facc15";

        alarm.textContent = "OFF";
        alarm.style.color = "#22c55e";

        water.style.background = "#eab308";

    } 
    else {

        status.textContent = "HIGH";
        status.style.color = "#ef4444";

        alarm.textContent = "ON";
        alarm.style.color = "#ef4444";

        water.style.background = "#ef4444";
    }
}

// Listen for slider changes
levelSlider.addEventListener("input", updateWaterLevel);

// Reset tank
resetButton.addEventListener("click", function() {

    levelSlider.value = 0;
    updateWaterLevel();

});

// Initial display
updateWaterLevel();