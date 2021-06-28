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

// get the click on add proj and set the div part with timer
const btn_add_proj = document.getElementById("buttonAddProject");
btn_add_proj.addEventListener("click", function(e) {
  e.preventDefault(); // Prevent from reload

  // delete old timer
  var project = document.getElementById("project");
  while (project.lastElementChild) {
    project.removeChild(project.lastElementChild);
  }


  // modify the div project
  var new_proj = document.createElement("p");
  var text = document.createTextNode("New Project");
  new_proj.appendChild(text);

  var new_input_timer = document.createElement("input");
  new_input_timer.setAttribute("type", "submit");
  new_input_timer.setAttribute("value", "Start Timer");
  new_input_timer.setAttribute("id", "buttonStartTimer");

  var new_timer = document.createElement("div");
  new_timer.setAttribute("id", "timer");

  project.appendChild(new_proj);
  project.appendChild(new_input_timer);
  project.appendChild(new_timer);


  // set the event for the timer
  const el = document.getElementById("buttonStartTimer");
  el.addEventListener("click", createTimer);
});