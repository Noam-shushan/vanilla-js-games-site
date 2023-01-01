
// SetCard class
// eche card has Shape, a Color, a Number, and a Filling between 1 and 3

const baseCardsUrl = "https://www.setgame.com/sites/all/modules/setgame_set/assets/images/new/";
const getSetCard = (cardNo) => {
    return baseCardsUrl + cardNo + ".png";
}

class SetCard {
    constructor(shape, color, number, filling, cardNo) {
        this.shape = shape;
        this.color = color;
        this.number = number;
        this.filling = filling;
        this.cardNo = cardNo;
        this.cardImg = getSetCard(cardNo);
    }

    // formola: 
    // (x1, x2, x3, x4)*(y1, y2, y3, y4) =
    // (2(x1 + y1) mod 3, 2(x2 + y2) mod 3, 2(x3 + y3)mod 3, 2(x4 + y4)mod 3)
    getThirdCardSet(otherCard) {
        return new SetCard(
            this.setFormola(this.shape, otherCard.shape),
            this.setFormola(this.color, otherCard.color),
            this.setFormola(this.number, otherCard.number),
            this.setFormola(this.filling, otherCard.filling)
        );
    }

    setFormola(x, y) {
        return (2 * (x + y)) % 3;
    }

    equals(otherCard) {
        return this.shape === otherCard.shape
            && this.color === otherCard.color
            && this.number === otherCard.number
            && this.filling === otherCard.filling;
    }
}

// Path: js\Games\Set\SetGame.js

export { SetCard }