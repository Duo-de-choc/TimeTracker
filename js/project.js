console.log('background project running');
// Project class
class Project {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.backgroundColor = '';
        this.days = "00";
        this.hours = "00";
        this.minutes = "00";
        this.seconds = "00";
    }
}

// Project data
const projects = {
    allProjects: []
};
chrome.storage.sync.get(['projects'], function(result) {
    if (result.projects.allProjects.length !== 0) {
        projects.allProjects = result.projects.allProjects;
    }
});

// Add project
function addProject(title) {
    // Getting the ID
    let ID = 0;

    let colors = ['#e0e0e0', '#ff9b9b', '#9bfff2', '#9bd2ff', '#9bb2ff', '#ad9bff', '#ffdc9b']

    chrome.storage.sync.get(['projects'], function(result) {
        if (result.projects.allProjects.length !== 0) {
            ID = result.projects.allProjects[result.projects.allProjects.length - 1].id + 1;
        }

        // Create a new instance
        const newProject = new Project(ID, title);
        newProject.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Add the project to the project data
        projects.allProjects.push(newProject);

        addProjectToUI(newProject)

        // Return the new project
        return newProject;
    });
}

// Update project title in data structure
function updateTitle(event) {
    const target = event.target;
    const ID = parseInt(target.parentNode.id.slice(8));

    let oldTitle = projects.allProjects.find(project => project.id === ID).title;
    
    target.type = "input";
    target.value = oldTitle;

    target.nextElementSibling.type = "submit";
    target.nextElementSibling.nextElementSibling.type = "submit";
}

function saveNewTitle(event){
    const target = event.target;
    const ID = parseInt(target.parentNode.id.slice(8));


    let inputText = target.previousElementSibling;
    let newTitle = inputText.value;

    projects.allProjects.find(project => project.id === ID).title = newTitle;

    inputText.type = "submit";
    inputText.value = "Change Project Title";

    target.type = "hidden";
    target.nextElementSibling.type = "hidden";

    // Saving projects
    chrome.storage.sync.set({'projects': projects}, function() {
        console.log('New project title : ' + newTitle);
    });
}

function cancelTitleChanging(event){
    const target = event.target;
    const ID = parseInt(target.parentNode.id.slice(8));

    target.type = "hidden"
    target.previousElementSibling.type = "hidden"
    target.previousElementSibling.previousElementSibling.value = "Change Project Title"
    target.previousElementSibling.previousElementSibling.type = "submit"

}


// Delete a project from data structure
function deleteProject(event) {
    const target = event.target;
    const ID = parseInt(target.parentNode.id.slice(8));

    let index = projects.allProjects.findIndex(project => project.id === ID);
    let title = projects.allProjects.find(project => project.id === ID).title;

    projects.allProjects.splice(index, 1);

    // Saving projects
    chrome.storage.sync.set({'projects': projects}, function() {
        console.log('Deleting project : ' + title);
    });
}

function deleteAllProjects() {
    projects.allProjects = [];
    // Saving projects
    chrome.storage.sync.set({'projects': projects}, function() {
        console.log('Clearing all projects : size : ' + projects.allProjects.length);
    });
}

// Testing
function testing() {
    console.log(projects);
    chrome.storage.sync.get(['projects'], (data) => {
        console.log(data.projects);
    });
}

// Add project to UI
function addProjectToUI(obj) {

    // Create markup
    let html = `
    <project class=project_${obj.id} id="project_${obj.id}">
        <h2>${obj.title}</h2>
        <div class="timer">
            <p class="timerText">Time logged : <span class="hours">${obj.hours}</span>:<span class="minutes">${obj.minutes}</span>:<span class="seconds">${obj.seconds}</span></p>
        </div>
        <button class="btnStart" value="Start">Start</button>

        <input type="submit" value="Change Project Title" class="buttonChangeTitle">
        <input type="hidden" value="Validate" class="buttonChangeTitleValidation">
        <input type="hidden" value="Cancel" class="buttonChangeTitleCancel">

        <input type="submit" value="Delete Project" class="buttonDeleteProject">
    </project>
    `;

    let style = `
    <style>
    .project_${obj.id} {
        display: grid;
        margin: auto;
        border: solid;
        border-width: 5px;
        border-color: #ffffff;
        width: 90%;
        height: 350px;
        background: ${obj.backgroundColor};
        border-radius: 50px;
    }
      
    project > h2 {
        display: grid;
        margin: auto;   
    }

    project > div {
        display: grid;
        margin: auto; 
    }

    project > .btnStart[value='Start'] {
        display: grid;
        margin: auto; 
        height: 15px;
        width: 50px;
        background: #c8ff9b;
        border-radius: 20px;
    }

    project > .btnStart[value='Stop'] {
        display: grid;
        margin: auto; 
        height: 15px;
        width: 50px;
        background: #fd5c5c;
        border-radius: 20px;
    }

    .project_${obj.id} > .buttonChangeTitle[type="submit"] {
        display: grid;
        margin: auto; 
        height: 20px;
        width: 200px;
        background: ${obj.backgroundColor};
        border: solid;
        border-color: #000000;
        border-width: 2px;
        border-radius: 20px;
    }

    project > .buttonChangeTitle[type="input"] {
        display: grid;
        margin: auto; 
        height: 20px;
        width: 200px;
        background: #e6e5e5;
        border: solid;
        border-color: #000000;
        border-width: 2px;
        border-radius: 20px;
    }

    .project_${obj.id} > .buttonChangeTitleValidation{
        display: grid;
        margin: auto; 
        height: 20px;
        width: 200px;
        background: ${obj.backgroundColor};
        border: solid;
        border-color: #000000;
        border-width: 2px;
        border-radius: 20px;
    }

    .project_${obj.id} > .buttonChangeTitleCancel{
        display: grid;
        margin: auto; 
        height: 20px;
        width: 200px;
        background: ${obj.backgroundColor};
        border: solid;
        border-color: #000000;
        border-width: 2px;
        border-radius: 20px;
    }

    .project_${obj.id} > .buttonDeleteProject{
        display: grid;
        margin: auto; 
        height: 20px;
        width: 200px;
        background: ${obj.backgroundColor};
        border: solid;
        border-color: #000000;
        border-width: 2px;
        border-radius: 20px;
    }

    </style>
    `

    // Insert the HTML into the DOM
    document.querySelector('.projects').insertAdjacentHTML('beforeend', html+style);
}


// Affichage des projet qui existent deja lorsqu'on ouvre l'extension
function initProjectDisplay() {
    chrome.storage.sync.get(['projects'], function(result) {
        if (result.projects.allProjects.length !== 0) {
            for (let i = 0; i < result.projects.allProjects.length; i++) {
                var proj_tmp = result.projects.allProjects[i];
                addProjectToUI(proj_tmp);
            }
        }
    })
}

/*
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
*/
// ------------------------------------------------ //
//             BEGINING OF THE CODE                 //
// ------------------------------------------------ //

initProjectDisplay();

// debugging print
chrome.storage.sync.get(['projects'], function(result) {
    console.log('Number of project init :' + result.projects.allProjects.length);
});

// Function to add a project
document.getElementById("buttonAddProject2").addEventListener("click", function(event) {
    // Prevent default behavior
    event.preventDefault();

    btnAddProj = document.getElementById("buttonAddProject")
    var title = btnAddProj.value;

    // If the input is not empty
    if (title !== '') {
        // Add the project to the data controller
        addProject(title);

        chrome.storage.sync.get(['projects'], function(result) {
            console.log('Number of project before adding :' + result.projects.allProjects.length);

            // Saving projects
            chrome.storage.sync.set({'projects': projects}, function() {
                console.log('projects is set to : project ID : ' + projects.allProjects[projects.allProjects.length - 1].id + "; project title : " + projects.allProjects[projects.allProjects.length - 1].title);
            });
        });
    }
    btnAddProj.value = "Add Project";
    btnAddProj.type = "submit";

    document.getElementById("buttonAddProject2").type = 'hidden';
});

// Function addEventListener for each project (delete proj, update, startTimer)
document.addEventListener("click", function(event) {
    const target = event.target;
    switch (target.className) {
        /*case 'btnStart':
            setTimer(event);
            break;

        case 'btnStart stop':
            setTimer(event);
            break;*/

        case 'buttonDeleteProject':
            deleteProject(event);
            break;

        case 'buttonChangeTitle':
            updateTitle(event);
            break;
        case 'buttonChangeTitleValidation' :
            saveNewTitle(event);
            break;
        case 'buttonChangeTitleCancel' :
            cancelTitleChanging(event);
            break;
    }

    switch (target.id) {
        case 'deleteAllProject':
            deleteAllProjects(event);
    }
});