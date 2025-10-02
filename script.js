// 1. Get all the important elements from the HTML
const display = document.querySelector(".display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const customInput = document.getElementById("customSeconds");
const setCustomBtn = document.getElementById("setCustomBtn");

// 2. Create variables to keep track of time and state
let timer = null; 
let elapsedTime = 0; 
let isRunning = false; 
let countdownMode = false; 
let countdownTime = 0; 

// 3. Function to update the display
function updateDisplay(seconds) {
  let hrs = Math.floor(seconds / 3600);
  let mins = Math.floor((seconds % 3600) / 60);
  let secs = seconds % 60;

  // Add leading zeros
  let formatted = 
    String(hrs).padStart(2, "0") + ":" + 
    String(mins).padStart(2, "0") + ":" + 
    String(secs).padStart(2, "0");

  display.textContent = formatted;
}

// 4. Function to start the stopwatch
function startTimer() {
  if (isRunning) return; 
  isRunning = true;

  timer = setInterval(() => {
    if (countdownMode) {
      if (countdownTime > 0) {
        countdownTime--;
        updateDisplay(countdownTime);
      } else {
        clearInterval(timer);
        isRunning = false;
        alert("Time’s up!");
      }
    } else {
      elapsedTime++;
      updateDisplay(elapsedTime);
    }
  }, 1000);
}

// 5. Function to stop the stopwatch
function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

// 6. Function to reset everything
function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  countdownTime = 0;
  countdownMode = false;
  updateDisplay(0);
}

// 7. Function for custom countdown
function setCustomTimer() {
  let input = Number(customInput.value);
  if (input > 0) {
    countdownTime = input;
    countdownMode = true;
    elapsedTime = 0;
    updateDisplay(countdownTime);
  } else {
    alert("Please enter a valid number.");
  }
}

// 8. Connect buttons to functions
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
setCustomBtn.addEventListener("click", setCustomTimer);