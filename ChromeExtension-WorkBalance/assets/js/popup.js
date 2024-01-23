
// Get the buttons from the popup
var startButton = document.getElementById('startButton');
var pauseButton = document.getElementById('pauseButton');
var resetButton = document.getElementById('resetButton');

// Add event listeners to the buttons
startButton.addEventListener('click', function() {
    sendMessage('start');
});

pauseButton.addEventListener('click', function() {
    sendMessage('pause');
});

resetButton.addEventListener('click', function() {
    sendMessage('reset');
});

// Send a message to the background script
function sendMessage(command) {
    chrome.runtime.sendMessage({command: command});
}
