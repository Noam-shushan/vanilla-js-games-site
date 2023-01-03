
/**
 * render the profile view of user
 * @param {User object} user 
 * @returns 
 */
export function profileView(user) {
    if (!user) {
        return;
    }
    const fullName = document.getElementById("profile-fullName");
    const username = document.getElementById("profile-username");
    fullName.innerText = `${user.firstName} ${user.lastName}`;
    username.innerText = '@' + user.username;
    const profileScores = document.getElementById("profile-scores");
    let avgPerGameTable = document.getElementById("avgPerGame");

    if (profileScores) {
        let bestFiveScoresPerGame = user.scores.reduce((acc, score) => {
            if (!acc[score.gameName]) {
                acc[score.gameName] = [];
            }
            acc[score.gameName].push(score);
            return acc;
        }, {});

        let avgPerGame = {};
        for (let gameName in bestFiveScoresPerGame) {
            let sum = 0;
            bestFiveScoresPerGame[gameName].forEach(score => {
                sum += score.score;
            });
            avgPerGame[gameName] = sum / bestFiveScoresPerGame[gameName].length;

            bestFiveScoresPerGame[gameName] = bestFiveScoresPerGame[gameName]
                .sort((a, b) => b.score - a.score)
                .slice(0, 3);
        }
        avgPerGameTable.innerHTML = '';
        Object.keys(avgPerGame).forEach(gameName => {
            avgPerGameTable.innerHTML +=
                `<tr>
                <td>${gameName}</td>
                <td>${avgPerGame[gameName]}</td>
            </tr>`;
        });
        profileScores.innerHTML='';
        for (let gameName in bestFiveScoresPerGame) {
            for (let i = 0; i < bestFiveScoresPerGame[gameName].length; i++) {
                profileScores.innerHTML +=
                    `<tr>
                        <td>${bestFiveScoresPerGame[gameName][i].gameName}</td>
                        <td>${bestFiveScoresPerGame[gameName][i].date}</td>
                        <td>${bestFiveScoresPerGame[gameName][i].score}</td>
                    </tr>`;
            }
        }
    }
}