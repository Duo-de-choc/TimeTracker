// ------------------------------------------------ //
//             TIMER FUNCTIONS                      //
// ------------------------------------------------ //

// init the Timer where it needs to be
function setTimer(event) {
    target = event.target;

    // If the button's text is start
    if (target.textContent === 'Start') {
        target.textContent = 'Stop';
        target.value = 'Stop'
        startTimer(event);

        // If the button's text is stop
    } else if (target.textContent === 'Stop') {
        target.textContent = 'Start';
        target.value = 'Start'
        stopTimer(event);

    }
}

// Start timer and recover the data from chrome
function startTimer(event) {
    const prjId = event.target.parentNode.id.slice(8);
    const target = event.target.previousElementSibling.lastElementChild;

    // get time tags
    const seconds = target.querySelector('.seconds');
    const minutes = target.querySelector('.minutes');
    const hours = target.querySelector('.hours');

    // get time values stored in chrome
    seconds.textContent = projects.allProjects.find(project => project.id == prjId).seconds;
    minutes.textContent = projects.allProjects.find(project => project.id == prjId).minutes;
    hours.textContent = projects.allProjects.find(project => project.id == prjId).hours;

    // changing time loop with save
    let sec = parseInt(seconds.textContent) + 60 * parseInt(minutes.textContent) + 3600 * parseInt(hours.textContent);
    intervalID = setInterval(() => {
        sec++;
        seconds.textContent = (`0${sec % 60}`).substr(-2);
        minutes.textContent = (`0${(parseInt(sec / 60)) % 60}`).substr(-2);
        hours.textContent = (`0${parseInt(sec / 3600)}`).substr(-2);

        saveTime(prjId, seconds.textContent, minutes.textContent, hours.textContent);
    }, 1000);

    // Add interval ID to event target as an attribute
    target.setAttribute('timerId', intervalID);
}


// save time in project
function saveTime(ID, seconds, minutes, hours) {
    projects.allProjects.find(project => project.id == ID).seconds = seconds;
    projects.allProjects.find(project => project.id == ID).minutes = minutes;
    projects.allProjects.find(project => project.id == ID).hours = hours;

    // Saving projects
    chrome.storage.sync.set({'projects': projects}, function() {
        console.log('Changing the time of the project :' + hours + ':' + minutes + ':' + seconds);
    });
}

// Stop the timer
function stopTimer(event) {
    const target = event.target.previousElementSibling.lastElementChild;
    clearInterval(target.getAttribute('timerId'));
}

document.addEventListener("click", function(event) {
    const target = event.target;
    switch (target.className) {
        case 'btnStart':
            setTimer(event);
            break;

        case 'btnStart stop':
            setTimer(event);
            break;
    }
});