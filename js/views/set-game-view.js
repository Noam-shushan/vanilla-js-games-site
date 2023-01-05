import { SetGame } from "../Games/Set/SetGame.js";
import { getCurrentUser, setCurrentUser } from "../storageHandler.js";
import { profileView } from "./profile.js";

let setGameModel = null;

let isInRefreshMode = false;

const startingMinutes = 2;
let time = startingMinutes * 60;

const scoreFactor = 2;

// the user score in the current session, calculated by the time left and the number of sets found
let userScore = 0;

// number of sets that the user found in the current session
let gameWins = 0;

// the current user
let currentUser = getCurrentUser();

/**
 * Set game flow
 * The root function for the set game
 */
function setGameFlow() {
    // inituialize the set game model
    setGameModel = new SetGame();

    // create the board
    createBoard();

    // headle the refresh board button 
    headleRefreshBoard();

    // set the timer for the game
    setTimer();
}

/**
 * Headle the refresh board button
 */
function headleRefreshBoard() {
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
            cards.forEach(card => card.classList.remove("vibrateCard"));
        }
    });
}

/**
 * Create the board from the model
 * @param {boolean} refresh flag to indicate if the board should be refreshed 
 */
function createBoard(refresh = false) {
    const cardsDiv = document.getElementById("cards");
    if (refresh) {
        modifyStyleClassOnRefreshTheBoard(cardsDiv);
    }

    const board = setGameModel.getBoard(refresh);

    for (let i = 0; i < board.length; i++) {
        const div = createCardDiv(board[i]);
        div.classList.add("growWhileSlideInLeft");
        cardsDiv.appendChild(div);
    }
}

/**
 * Modify the style classes on refresing the board
 * @param {HTMLElement} cardsDiv 
 */
function modifyStyleClassOnRefreshTheBoard(cardsDiv) {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.classList.remove("vibrateCard", "selected", "growWhileSlideInLeft", "replaceCard");
    });
    cardsDiv.innerHTML = "";
}

/**
 * Create a div from a card object
 * @param {SetCard} card the card on the board
 * @returns new card div with img in card id event listener for click for set check
 */
function createCardDiv(card) {
    const div = document.createElement("div");
    div.classList.add("card");
    div.id = `card-${card.cardNo}`;
    div.innerHTML =
        `<img src="${card.cardImg}" alt="set card no ${card.cardNo}">`;

    div.addEventListener("click", (event) => {
        event.preventDefault();
        div.classList.toggle("selected");
        checkForValidSet();
        replaceCardOnRefresh();
    });
    return div;
}

/**
 * Check if the selected cards are a set
 * If they are a set, replace the cards with new cards
 * If they are not a set, alert the user
 */
function checkForValidSet() {
    const selectedCards = document.querySelectorAll(".selected");
    const selectedCardsArray = [...selectedCards];
    if (selectedCardsArray.length === 3) {
        let cardsId = selectedCardsArray.map(card => Number(card.id.split("-")[1]));
        const [x, y, z] = cardsId;

        const [isSet, newCards] = setGameModel.isSet(x, y, z)
        if (isSet) {
            // if there are no more cards, game over
            if (!newCards) {
                gameOver();
            }
            userScore += Math.round((time / 60) * scoreFactor);
            const score = document.getElementById("score");
            score.innerHTML = `${userScore}`;

            const wins = document.getElementById("wins");
            wins.innerHTML = `${++gameWins}`;
            // reset the timer
            resetTimer();
            // replace the selected cards with new cards
            repleceCardsOnSet(newCards, selectedCards);
        } else {
            alert("Not a set!");
        }
        selectedCards.forEach((card) => card.classList.remove("selected"));
    }
}

/**
 * Replece the selected cards with new cards on set found
 * @param {SetCard[]} newCards 
 * @param {NodeListOf<Element>} selectedCards 
 */
function repleceCardsOnSet(newCards, selectedCards) {
    for (let i = 0; i < newCards.length; i++) {
        selectedCards[i].classList.add("replaceCard");
        selectedCards[i].id = `card-${newCards[i].cardNo}`;
        selectedCards[i].innerHTML =
            `<img src="${newCards[i].cardImg}" alt="set card no ${newCards[i].cardNo}">`;
    }
}

/**
 * Game over function
 * Create new board, reset time, save score if user is logged in
 */
function gameOver() {
    alert("Game over!");
    createBoard(true);
    resetTimer();

    if (currentUser && userScore > 0) {
        currentUser.scores.push({
            gameName: "Set",
            date: new Date().toLocaleString(),
            score: userScore
        });
        setCurrentUser(currentUser);
        profileView(currentUser);
    }
    userScore = 0;
    gameWins = 0;
}

/**
 * Reset the timer
 */
function resetTimer() {
    time = startingMinutes * 60;
}

/**
 * Set the timer
 */
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

/**
 * Replace the selected card with a new card on refresh mode
 */
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










