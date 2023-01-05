import { logoutUser } from "./login-view.js";
import { getCurrentUser } from "../storageHandler.js";
import { profileView } from "./profile.js";

/**
 * Render the home view
 * Toggel the login and logout buttons
 */
function home() {
    let currentUser = getCurrentUser();
    if (currentUser) {
        profileView(currentUser);

        const model = document.querySelector("#model");

        dragElement(model);

        const profile = document.querySelector("#profile");
        const closeModel = document.querySelector("#close-model");
        profile.addEventListener("click", () => {
            model.show();
        });

        closeModel.addEventListener("click", () => {
            model.close();
        });

        profile.style.display = "block";
        profile.innerText = currentUser.username;

        document.getElementById("login").style.display = "none";

        const logout = document.getElementById("logout");
        logout.style.display = "block";
        logout.addEventListener("click", () => {
            if (confirm("Are you sure you want to logout?")) {
                logoutUser();
                logout.style.display = "none";
                document.getElementById("login").style.display = "block";
                profile.innerText = "Profile";
                profile.style.display = "none";
            }
        });
    }
}

/**
 * Drag any html element in the page
 * @param {Element} elmnt 
 */
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id)) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id).onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

home();
