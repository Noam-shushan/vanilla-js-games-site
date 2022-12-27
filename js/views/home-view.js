import { isUserLoggedIn, logUserIn } from "./login-view.js";

function home() {
    let loginDiv = document.getElementById("login");
    if (!isUserLoggedIn()) {
        loginDiv.classList.remove("none");
        loginDiv.classList.add("flex", "justify-evenly", "align-start", "flex-row");
    } else {
        loginDiv.classList.remove("flex", "justify-evenly", "align-start", "flex-row");
        loginDiv.classList.add("none");
    }
}

home();
