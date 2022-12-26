class Player {
    constructor(username) {
        this.username = username;
        this.scores = [];
    }

    // score is {gmae: "set", score: 100, date: "2021-01-01 12:00:00"}
    addScore(score) {
        this.scores.push(score);
    }
}

export { Player };