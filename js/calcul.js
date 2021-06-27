// modify the div
function createTimer(event) {
  event.preventDefault();
  const timer = document.getElementById("timer");
  setInterval(myTimer, 1000);
}

// timer (date for now)
function myTimer() {
  const d = new Date();
  document.getElementById("timer").innerHTML = d.toLocaleTimeString();
}

// get the click
const el = document.getElementById("button_timer");
el.addEventListener("click", createTimer);