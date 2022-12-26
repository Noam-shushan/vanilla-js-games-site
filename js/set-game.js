

function getSetCard(cardNo) {
    let baseUrlSetGame = `https://www.setgame.com/sites/all/modules/setgame_set/assets/images/new/${cardNo}.png`;
    return baseUrlSetGame;
}

const maxCard = 81;
let randomNumbers = {};
function getUniqRandomNumber() {
    let randomNum = Math.ceil(Math.random() * maxCard);
    while (randomNumbers[randomNum] != undefined) {
        randomNum = Math.ceil(Math.random() * maxCard);
    }
    randomNumbers[randomNum] = 1;
    return randomNum;
}

function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

const filldBegin = 1;
const filldEnd = 27;

const zebraBegin = 28;
const zebraEnd = 54;

const emptyBegin = 55;
const emptyEnd = 81;

const sameClassSet = (a, b, c) => {
    if (a >= filldBegin && a <= filldEnd && b >= filldBegin && b <= filldEnd && c >= filldBegin && c <= filldEnd) {
        return true;
    }

    if (a >= zebraBegin && a <= zebraEnd && b >= zebraBegin && b <= zebraEnd && c >= zebraBegin && c <= zebraEnd) {
        return true;
    }

    if (a >= emptyBegin && a <= emptyEnd && b >= emptyBegin && b <= emptyEnd && c >= emptyBegin && c <= emptyEnd) {
        return true;
    }
    return false;
};

const diffClassSet = (a, b, c) => {
    if (a >= filldBegin && a <= filldEnd && b >= zebraBegin && b <= zebraEnd && c >= emptyBegin && c <= emptyEnd) {
        return true;
    }
    return false;
};

const mode3Set = (a, b, c) => { 
    const sameClass = sameClassSet(a, b, c);
    if (!sameClass) {
        return false;
    }
    for (let i = 1; i < 3; i++) {
        if (a == b - (3 ** i) && b == c - (3 ** i)){
            return true;
        }
    }
    return false;
};

const diffClassSameModeSet = (a, b, c) => {
    return diffClassSet(a, b, c) && a == b - (3 ** 3) && b == c - (3 ** 3);    
}


function SetGame() {
    const cards = document.getElementById("cards");
    for (let i = 1; i < 82; i++) {
        const randomInt = getUniqRandomNumber();
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = 
        `<p>Card no ${i}</p>
        <img src="${getSetCard(i)}" alt="set card no ${i}">`;
        cards.appendChild(div);
    }
}

console.log("set-game.js loaded");

SetGame();


