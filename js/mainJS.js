document.getElementById("buttonAddProject").addEventListener("click", change);

function change(){ // no ';' here
    var elem = document.getElementById("buttonAddProject");
    if (elem.value=="Add Project"){
        elem.type = "text";
        elem.value = ""
    }
}