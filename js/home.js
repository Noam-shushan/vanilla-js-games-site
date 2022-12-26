import { isUserLoggedIn, logUserIn } from "./login.js";

function home() {
    console.log("home");
    if (!isUserLoggedIn()) {
        document.getElementById("login").style.display = "block";
        // document.getElementById("logout").style.display = "none";
    } else {
        document.getElementById("login").style.display = "none";
        // document.getElementById("logout").style.display = "block";
    }
}

home();
