import { logoutUser } from "./login-view.js";
import { getCurrentUser } from "../storageHandler.js";

function home() {
    let currentUser = getCurrentUser();
    if (currentUser) {
        document.getElementById("profile").innerText = currentUser.username;

        document.getElementById("login").style.display = "none";

        const logout = document.getElementById("logout");
        logout.style.display = "block";
        logout.addEventListener("click", () => {
            if (confirm("Are you sure you want to logout?")) {
                logoutUser();
                logout.style.display = "none";
                document.getElementById("login").style.display = "block";
                document.getElementById("profile").innerText = "Profile";
            }
        });
    }
}

home();
