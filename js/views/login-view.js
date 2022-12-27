import { saveData, getData } from "../storageHandler.js"
import { Player } from "../models/Player.js";

document.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("username").value;

    let players = getData("players");
    let data = players.find((player) => player.username === name);
    if (data) {
        alert("Username already taken, please choose another one.");
        return;
    }

    let player = new Player(name);
    console.log(`new player: ${name}`);
    saveData("players", player);
    alert(`Welcome ${name}!`);
    // clear the form
    document.getElementById("username").value = "";

    // navigate to the home page
    window.location.href = "/";
});


function isUserLoggedIn() {
    let loggedIn = sessionStorage.getItem('loggedIn');
    if (!loggedIn) {
        return false;
    }
    let isLoggedIn = JSON.parse(loggedIn);
    return isLoggedIn;
}

function logUserIn() {
    sessionStorage.setItem('loggedIn', true);
}

function logUserOut() {
    sessionStorage.setItem('loggedIn', false);
}

export { isUserLoggedIn, logUserIn, logUserOut };