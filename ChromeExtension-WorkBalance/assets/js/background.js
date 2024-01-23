// Set the default study and break times in milliseconds
var studyTime = 25 * 60 * 1000;
var breakTime = 5 * 60 * 1000;

// Initialize the state
var isStudying = true;
var timerId = null;

// Listen for a message from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command === "start") {
        startTimer();
    } else if (request.command === "pause") {
        pauseTimer();
    } else if (request.command === "reset") {
        resetTimer();
    }
});

// Start the timer
function startTimer() {
    if (timerId) {
        return;
    }

    var time = isStudying ? studyTime : breakTime;
    timerId = setTimeout(onTimerEnd, time);
}

// Pause the timer
function pauseTimer() {
    if (!timerId) {
        return;
    }

    clearTimeout(timerId);
    timerId = null;
}

// Reset the timer
function resetTimer() {
    pauseTimer();
    isStudying = true;
    startTimer();
}

// Handle the end of the timer
function onTimerEnd() {
    timerId = null;
    isStudying = !isStudying;

    // Show a notification
    var notificationOptions = {
        type: "basic",
        iconUrl: "icon.png",
        title: isStudying ? "Study time!" : "Break time!",
        message: isStudying ? "Time to study for 25 minutes." : "Time for a 5 minute break."
    };
    chrome.notifications.create("", notificationOptions);

    // Start the next timer
    startTimer();
}
