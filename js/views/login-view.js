import { saveData, getData, getCurrentUser } from "../storageHandler.js"


/**
 * User object factory function
 * @param {string} username 
 * @param {string} password 
 * @param {string} firstName 
 * @param {string} lastName 
 * @returns {User} new user object
 */
function User(usernameParm, passwordParm, firstNameParm, lastNameParm) {
    return {
        username: usernameParm,
        password: passwordParm,
        firstName: firstNameParm,
        lastName: lastNameParm,
        /**
         * @type {Array<{gameName: string, score: number, data: Date}>}
         */
        scores: [],
    };
}

/**
 * Open the tab of the login or signup form
 * @param {MouseEvent} event the mouse event 
 * @param {string} tabName the tab name to open (login or signup)
 */
function openTab(event, tabName) {
    // Get all elements with class="tabcontent" and hide them
    let tabcontent = document.querySelectorAll(".tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        if (tabcontent[i].id !== tabName) {
            tabcontent[i].style.display = "none";
        }
    }

    let currentTab = document.querySelector(`#${tabName}.tabcontent`);
    currentTab.style.display = "block";

    // Get all elements with class="tablinks" and remove the class "active"
    let tablinks = document.querySelectorAll(".tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    event.target.classList.add("active");
}

// listen to the click event on the tablinks
document.addEventListener("click", event => {
    if (event.target.matches(".tablinks")) {
        openTab(event, event.target.dataset.link);
    }
});

// listen to the submit event on the login and signup forms
document.addEventListener("submit", (event) => {
    event.preventDefault();
    let currentUser = getCurrentUser();
    if (currentUser) {
        alert("You are already logged in!");
        return;
    }
    if (event.target.matches("#login")) {
        login();
    } else if (event.target.matches("#signup")) {
        signup();
    }
    // navigate to the home page 
    window.location.href = "/";
});

/**
 * Login function 
 */
function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    let users = getData("users");
    let userData = users.find(user => user.username === username);
    if (!userData) {
        alert("Username not found, please try again.");
        return;
    }

    if (userData.password !== password) {
        alert("Wrong password, please try again.");
        return;
    }

    console.log(`user logged in: ${userData.username}`);
    loginUser(userData);
    alert(`Welcome back ${userData.username}!`);

    // clear the form
    document.getElementById("login-username").value = "";
    document.getElementById("login-password").value = "";
}

/**
 * Signup function
 */
function signup() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    let users = getData("users");
    let userData = users.find(user => user.username === username);
    if (userData) {
        alert("Username already exists, please try again.");
        document.getElementById("username").value = "";
        return;
    }

    if (confirmPassword !== password) {
        alert("Passwords do not match, please try again.");
        return;
    }

    let newUser = User(username, password, firstName, lastName);
    saveData("users", newUser);
    console.log(`new user registered: ${username}`);
    loginUser(newUser);
    alert(`Welcome ${username}!`);

    // clear the form
    document.getElementById("signup-username").value = "";
    document.getElementById("signup-password").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("confirmPassword").value = "";
}

/**
 * Logs in the user
 * @param {User} user 
 */
function loginUser(user) {
    let userJson = JSON.stringify(user);
    sessionStorage.setItem('currentUser', userJson);
}

/**
 * Logs out the current user
 */
function logoutUser() {
    sessionStorage.setItem('currentUser', "");
    window.location.href = "/";
}

export { loginUser, logoutUser };