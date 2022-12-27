import { SetGame } from "../Games/Set/SetGame.js";

const maxCard = 81;
let randomNumbers = {};

const setGameModel = new SetGame();

function SetGameFlow() {
    createBord();
}

SetGameFlow();

function createBord() {
    const cards = document.getElementById("cards");
    for (let i = 0; i < 12; i++) {
        const randomInt = getUniqRandomNumber();
        const div = document.createElement("div");
        div.id = `card-${randomInt}`;
        div.addEventListener("click", (event) => {
            event.preventDefault();
            div.classList.toggle("selected");
            checkForValidSet();
        });
        div.classList.add("card");
        div.innerHTML =
            `<img src="${getSetCard(randomInt)}" alt="set card no ${randomInt}">`;
        cards.appendChild(div);
    }
}

function getSetCard(cardNo) {
    let baseUrlSetGame = `https://www.setgame.com/sites/all/modules/setgame_set/assets/images/new/${cardNo}.png`;
    return baseUrlSetGame;
}


function getUniqRandomNumber() {
    let randomNum = Math.ceil(Math.random() * maxCard);
    while (randomNumbers[randomNum] != undefined) {
        randomNum = Math.ceil(Math.random() * maxCard);
    }
    randomNumbers[randomNum] = 1;
    return randomNum;
}

function checkForValidSet() {
    const selectedCards = document.querySelectorAll(".selected");
    const selectedCardsArray = [...selectedCards];
    if (selectedCardsArray.length === 3) {
        let numbers = selectedCardsArray.map(card => Number(card.id.split("-")[1]));
        const [x, y, z] = numbers;
        console.log([x, y, z]);

        if (setGameModel.isSet(x, y, z)) {
            alert("Set!");
        } else {
            alert("Not a set!");
        }
        selectedCards.forEach((card) => {
            card.classList.remove("selected");
        });
    }
}

// function range(size, startAt = 0) {
//     return [...Array(size).keys()].map(i => i + startAt);
// }









