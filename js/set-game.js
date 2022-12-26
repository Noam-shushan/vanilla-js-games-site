

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

    document.querySelector(".card").addEventListener("click", function () {
        this.classList.toggle("selected");
    });

}

SetGame();


