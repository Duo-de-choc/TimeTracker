console.log('background header running');

const btnAddProject = document.getElementById("buttonAddProject")
if (btnAddProject){
    btnAddProject.addEventListener("click", change);
}

function change(){ 
    var elem = document.getElementById("buttonAddProject");
    if (elem.value=="Add Project"){
        elem.type = "text";
        elem.value = ""
    }
    var elem = document.getElementById("buttonAddProject2");
    elem.type = "submit"
}