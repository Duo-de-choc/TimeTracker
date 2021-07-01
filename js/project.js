console.log('background project running');
// Project class
class Project {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
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

    chrome.storage.sync.get(['projects'], function(result) {
        if (result.projects.allProjects.length !== 0) {
            ID = result.projects.allProjects[result.projects.allProjects.length - 1].id + 1;
        }

        // Create a new instance
        const newProject = new Project(ID, title);

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

    projects.allProjects.find(project => project.id === ID).title = newTitle;

    // Saving projects
    chrome.storage.sync.set({
        'projects': projects
    }, function() {
        console.log('Changing the title of the project : old title : ' + oldTitle + "; new title : " + newTitle);
    });
}

// Delete a project from data structure
function deleteProject(event) {
    const target = event.target;
    const ID = parseInt(target.parentNode.id.slice(8));

    let index = projects.allProjects.findIndex(project => project.id === ID);
    let title = projects.allProjects.find(project => project.id === ID).title;

    projects.allProjects.splice(index, 1);

    // Saving projects
    chrome.storage.sync.set({
        'projects': projects
    }, function() {
        console.log('Deleting project : ' + title);
    });
}

function deleteAllProjects() {
    projects.allProjects = [];
    // Saving projects
    chrome.storage.sync.set({
        'projects': projects
    }, function() {
        console.log('Clearing all projects : size : ' + projects.allProjects.length);
    });
}

// Testing
function testing() {
    console.log(projects);
}

// Add project to UI
function addProjectToUI(obj) {

    // Create markup
    const html = `
    <li id="project-${obj.id}">
        <h2>${obj.title}</h2>
        <div class="timer">
            <p class="timer-label">Total Time Spent</p>
            <p class="timer-text"><span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span></p>
        </div>
        <button class="btn-start" id="btn-start-${obj.id}">Start</button>
        <input type="submit" value="Delete Project" id="buttonDeleteProject">
    </li>
    `;

    // Insert the HTML into the DOM
    document.querySelector('.projects').insertAdjacentHTML('beforeend', html);
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

// ------------------------------------------------ //
//             TIMER FUNCTIONS                      //
// ------------------------------------------------ //

var ev;
// init the Timer where it needs to be
function setTimer(event) {
    target = event.target;

    // If the button's text is start
    if (target.textContent === 'Start') {
        target.textContent = 'Stop';
        startTimer(event);

        // If the button's text is stop
    } else if (target.textContent === 'Stop') {
        target.textContent = 'Start';
        stopTimer(event);

    }
}

function startTimer(event) {

    const target = event.target.previousElementSibling.lastElementChild;
    const seconds = target.querySelector('.seconds');
    const minutes = target.querySelector('.minutes');
    const hours = target.querySelector('.hours');


    let sec = parseInt(seconds.textContent);
    intervalID = setInterval(() => {
        sec++;
        console.log(sec)
        seconds.textContent = (`0${sec % 60}`).substr(-2);
        minutes.textContent = (`0${(parseInt(sec / 60)) % 60}`).substr(-2);
        hours.textContent = (`0${parseInt(sec / 3600)}`).substr(-2);

        // need to save the data
    }, 1000);

    // Add interval ID to event target as an attribute
    target.setAttribute('timer-id', intervalID);
}

// Stop the timer
function stopTimer(event) {
    const target = event.target.previousElementSibling.lastElementChild;
    clearInterval(target.getAttribute('timer-id'));
}



// ------------------------------------------------ //
//             BEGINING OF THE CODE                 //
// ------------------------------------------------ //

initProjectDisplay();

// debugging print
chrome.storage.sync.get(['projects'], function(result) {
    console.log('Number of project init :' + result.projects.allProjects.length);
});

// Function to add a project
const btnAddProj2 = document.getElementById("buttonAddProject2");
btnAddProj2.addEventListener("click", function(event) {
    // Prevent default behavior
    event.preventDefault();

    var title = document.getElementById("buttonAddProject").value;

    // If the input is not empty
    if (title !== '') {
        // Add the project to the data controller
        addProject(title);

        chrome.storage.sync.get(['projects'], function(result) {
            console.log('Number of project before adding :' + result.projects.allProjects.length);

            // Saving projects
            chrome.storage.sync.set({
                'projects': projects
            }, function() {
                console.log('projects is set to : project ID : ' + projects.allProjects[projects.allProjects.length - 1].id + "; project title : " + projects.allProjects[projects.allProjects.length - 1].title);
            });
        });
    }
    document.getElementById("buttonAddProject").value = "";
});

// Function addEventListener for each project (delete proj, update, startTimer)
document.addEventListener("click", function(event) {
    const target = event.target;
    if (target) {
        switch (target.id) {

            // changer delete project car ID 
            case 'buttonDeleteProject':
                deleteProject(event);

            case 'deleteAllProject':
                deleteAllProjects(event);
        }
        if (target.className === 'btn-start' || target.className === 'btn-start stop') {
            setTimer(event);
        }
    }
});