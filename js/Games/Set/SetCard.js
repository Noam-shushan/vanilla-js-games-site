
/**
 * SetCard class
 * eche card is a vector of (shape, color, number, filling) between 1 and 3
 * eche card olso has a cardNo between 1 and 81 and image url of the card
 * @param {number} shape the card shape
 * @param {number} color the card color
 * @param {number} number the card number
 * @param {number} filling the card filling 
 * @param {number} cardNo the card id
 * @param {string} cardImg the card image url
 */
class SetCard {
    constructor(shape, color, number, filling, cardNo) {
        this.shape = shape;
        this.color = color;
        this.number = number;
        this.filling = filling;
        this.cardNo = cardNo;
        this.cardImg = getSetCard(cardNo);
    }

    /**
     * Get the third card that make a set with this card and otherCard
     * Card formola: (x1, x2, x3, x4)*(y1, y2, y3, y4) = 
     * (2(x1 + y1) mod 3, 2(x2 + y2) mod 3, 2(x3 + y3)mod 3, 2(x4 + y4)mod 3)
     * @param {SetCard} otherCard any card that different from this card
     * @returns {SetCard} the third card that make a set with this card and otherCard
     */
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

    /**
     * Check if this card is equal to otherCard by the vector of (shape, color, number, filling)
     * @param {SetCard} otherCard 
     * @returns true if this card is equal to otherCard
     */
    equals(otherCard) {
        return this.shape === otherCard.shape
            && this.color === otherCard.color
            && this.number === otherCard.number
            && this.filling === otherCard.filling;
    }
}

const baseCardsUrl = "https://www.setgame.com/sites/all/modules/setgame_set/assets/images/new/";
const getSetCard = (cardNo) => {
    return baseCardsUrl + cardNo + ".png";
}

// Path: js\Games\Set\SetGame.js

export { SetCard }