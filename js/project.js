// Project class
class Project {
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }
}

// Project data
const projects = {
    allProjects: []
};

// Add project
function addProject(title){

    // Create ID
    let ID;
    if (projects.allProjects.length > 0) {
        ID = projects.allProjects[projects.allProjects.length - 1].id + 1;
    } else {
        ID = 0;
    }

    // Create a new instance
    const newProject = new Project(ID, title);

    // Add the project to the project data
    projects.allProjects.push(newProject);

    // Return the new project
    return newProject;

}

// Update project title in data structure
function updateTitle(newTitle, ID) {

    // Find the object with matching ID
    const projectToUpdate = projects.allProjects.find(project => project.id === ID);
    
    // Update the title
    projectToUpdate.title = newTitle;

}

// Delete a project from data structure
function deleteData(ID) {

    const currentProject = projects.allProjects.map(current => current.id);
    const index = currentProject.indexOf(ID);
    if (index !== -1) {
        projects.allProjects.splice(index, 1);
    }

}

// Testing
function testing() {
    console.log(projects);
}

const btnAddProj2 = document.getElementById("buttonAddProject2");
btnAddProj2.addEventListener("click", function(e) {
    var title = document.getElementById("buttonAddProject").value;
    addProject(title);

});
