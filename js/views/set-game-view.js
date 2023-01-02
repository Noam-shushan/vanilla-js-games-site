import { SetGame } from "../Games/Set/SetGame.js";
import { getCurrentUser, setCurrentUser } from "../storageHandler.js";
import { profileView } from "./profile.js";

let setGameModel = null;
let isInRefreshMode = false;

const startingMinutes = 2;
let time = startingMinutes * 60;

let userScore = 0;
let gameWins = 0;

let currentUser = getCurrentUser();


function setGameFlow() {
    setGameModel = new SetGame();
    // create the board
    createBoard();

    const refreshButton = document.getElementById("refteshBordBtn");
    refreshButton.addEventListener("click", (event) => {
        event.preventDefault();
        isInRefreshMode = !isInRefreshMode;
        const cards = document.querySelectorAll(".card");
        if (isInRefreshMode) {
            cards.forEach((card) => {
                card.classList.remove("selected", "growWhileSlideInLeft", "replaceCard");
                card.classList.add("vibrateCard");
            });
        } else {
            cards.forEach(card => {
                card.classList.remove("vibrateCard");
            });
        }
    });

    setTimer();
}


function createBoard(refresh = false) {
    const cardsDiv = document.getElementById("cards");
    if (refresh) {
        const cards = document.querySelectorAll(".card");
        cards.forEach(card => {
            card.classList.remove("vibrateCard", "selected", "growWhileSlideInLeft", "replaceCard");
        });
        cardsDiv.innerHTML = "";
    }

    const board = setGameModel.getBoard(refresh);

    for (let i = 0; i < board.length; i++) {
        const div = createCardDiv(board, i);
        div.classList.add("growWhileSlideInLeft");
        cardsDiv.appendChild(div);
    }
}


function createCardDiv(bord, i) {
    const div = document.createElement("div");
    div.classList.add("card");
    div.id = `card-${bord[i].cardNo}`;
    div.innerHTML =
        `<img src="${bord[i].cardImg}" alt="set card no ${bord[i].cardNo}">`;

    div.addEventListener("click", (event) => {
        event.preventDefault();
        div.classList.toggle("selected");
        checkForValidSet();
        replaceCardOnRefresh();
    });
    return div;
}


function checkForValidSet() {
    const selectedCards = document.querySelectorAll(".selected");
    const selectedCardsArray = [...selectedCards];
    if (selectedCardsArray.length === 3) {
        let numbers = selectedCardsArray.map(card => Number(card.id.split("-")[1]));
        const [x, y, z] = numbers;

        const [isSet, newCards] = setGameModel.isSet(x, y, z)
        if (isSet) {
            if (!newCards) {
                gameOver();
            }
            userScore += Math.ceil(time / 60);
            const score = document.getElementById("score");
            score.innerHTML = `${userScore}`;

            const wins = document.getElementById("wins");
            wins.innerHTML = `${++gameWins}`;

            time = startingMinutes * 60;

            for (let i = 0; i < newCards.length; i++) {
                selectedCards[i].classList.add("replaceCard");
                selectedCards[i].id = `card-${newCards[i].cardNo}`;
                selectedCards[i].innerHTML =
                    `<img src="${newCards[i].cardImg}" alt="set card no ${newCards[i].cardNo}">`;
            }
        } else {
            alert("Not a set!");
        }
        selectedCards.forEach((card) => {
            card.classList.remove("selected");
        });
    }
}

function gameOver() {
    alert("Game over!");
    createBoard(true);
    time = startingMinutes * 60;
    if (currentUser) {
        currentUser.scores.push({
            gameName: "Set",
            date: new Date().toLocaleString(),
            score: userScore
        });
        setCurrentUser(currentUser);
        profileView(currentUser);
    }
}


function setTimer() {
    const timer = document.getElementById("timer");
    const countDown = () => {
        if (time === 0) {
            gameOver();
        }
        const minuts = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        timer.innerHTML = `${minuts}:${seconds}`;
        time--;
    };
    setInterval(countDown, 1000);
}


function replaceCardOnRefresh() {
    if (!isInRefreshMode) {
        return;
    }

    const selectedCards = document.querySelectorAll(".selected");
    if (selectedCards.length === 1) {
        const cardId = Number(selectedCards[0].id.split("-")[1]);
        let newCard = setGameModel.replaceCard(cardId);

        selectedCards[0].classList.add("replaceCard");

        selectedCards[0].id = `card-${newCard.cardNo}`;
        selectedCards[0].innerHTML =
            `<img src="${newCard.cardImg}" alt="set card no ${newCard.cardNo}">`;

        selectedCards[0].classList.remove("selected");

        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => {
            card.classList.remove("vibrateCard");
        });
    }
    isInRefreshMode = false;
}

// run the game
setGameFlow();


// function range(size, startAt = 0) {
//     return [...Array(size).keys()].map(i => i + startAt);
// }









