import { SetCard } from "./SetCard.js";

const maxCard = 81;

class SetGame {
    constructor() {
        this.build();
    }

    isSet(cardNum1, cardNum2, cardNum3) {
        if (cardNum1 === cardNum2 || cardNum1 === cardNum3 || cardNum2 === cardNum3) {
            return false;
        }

        if (!this.isValidRange(cardNum1) || !this.isValidRange(cardNum2) || !this.isValidRange(cardNum3)) {
            return false;
        }
        let chosinCards = this.cardsList.filter(card => card.cardNo === cardNum1 || card.cardNo === cardNum2 || card.cardNo === cardNum3);
        const [x, y, z] = chosinCards;

        let thirdSet = x.getThirdCardSet(y);
        return thirdSet.equals(z);
    }

    isValidRange(cardNum) {
        return cardNum >= 0 && cardNum <= maxCard;
    }

    build() {
        this.cardsList = [];
        let shape, color, number, filling = 1;

        // create all cards
        // shape: oval = 1, squiggle = 2, diamond = 0 
        // color: red = 1, purple = 2, green = 0
        // number: 1 = 1, 2 = 2, 3 = 0
        // filling: solid = 1, unfilled = 2, striped = 0
        // i in ranges: 10..18, 37..45, 64..72  => shape = 0
        // i in ranges: 19..27, 46..54, 73..81  => shape = 1
        // i in ranges: 1..9, 28..36, 55..63    => shape = 2
        // i in ranges: 1..3, 10..12, 19..21, 28..30, 37..39, 46..48, 55..57, 64..66, 73..75 => color = 1
        // i in ranges: 4..6, 13..15, 22..24, 31..33, 40..42, 49..51, 58..60, 67..69, 76..78 => color = 2
        // i in ranges: 7..9, 16..18, 25..27, 34..36, 43..45, 52..54, 61..63, 70..72, 79..81 => color = 0
        // number = i % 3
        // i in ranges: 1..27 => filling = 1
        // i in ranges: 28..54 => filling = 0
        // i in ranges: 55..81 => filling = 2
        for (let i = 1; i <= maxCard; i++) {
            // shape
            if (i >= 10 && i <= 18 || i >= 37 && i <= 45 || i >= 64 && i <= 72) {
                shape = 0;
            } else if (i >= 19 && i <= 27 || i >= 46 && i <= 54 || i >= 73 && i <= 81) {
                shape = 1;
            } else {
                shape = 2;
            }

            // color
            if (i >= 1 && i <= 3 || i >= 10 && i <= 12 || i >= 19 && i <= 21 || i >= 28 && i <= 30 || i >= 37 && i <= 39 || i >= 46 && i <= 48 || i >= 55 && i <= 57 || i >= 64 && i <= 66 || i >= 73 && i <= 75) {
                color = 1;
            } else if (i >= 4 && i <= 6 || i >= 13 && i <= 15 || i >= 22 && i <= 24 || i >= 31 && i <= 33 || i >= 40 && i <= 42 || i >= 49 && i <= 51 || i >= 58 && i <= 60 || i >= 67 && i <= 69 || i >= 76 && i <= 78) {
                color = 2;
            } else {
                color = 0;
            }

            // number
            number = i % 3;

            // filling
            if (i >= 1 && i <= 27) {
                filling = 1;
            } else if (i >= 28 && i <= 54) {
                filling = 0;
            } else {
                filling = 2;
            }

            this.cardsList.push(new SetCard(shape, color, number, filling, i));
        }
    }
}

export { SetGame }