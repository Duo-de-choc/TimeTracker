// modify the div
function createTimer(event) {
  event.preventDefault();
  var timer = document.getElementById("timer");
  setTimer(timer); // start and disp the timer where needed
}

// init the Timer where it needs to be
function setTimer(tag) {
  var start = Date.now();
  tag.innerHTML = dispTime(0); // init disp
  setInterval(function() {
    var delta = Date.now() - start;
    tag.innerHTML = dispTime(delta);
  }, 1000); // update about every second
}

// Display the timer in the right form
function dispTime(time) {
  var t = Math.floor(time / 1000);
  var hours = Math.floor(t / 3600);
  t = t - hours * 3600;
  var minutes = Math.floor(t / 60);
  var seconds = t - minutes * 60;
  var time_in_text = hours + ":" + minutes + ":" + seconds;
  return time_in_text;
}

// get the click
const el = document.getElementById("buttonAddProject");
el.addEventListener("click", createTimer);