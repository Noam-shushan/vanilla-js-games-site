
function profileView(user) {
    if (!user) {
        return;
    }
    const fullName = document.getElementById("profile-fullName");
    const username = document.getElementById("profile-username");
    fullName.innerText = `${user.firstName} ${user.lastName}`;
    username.innerText = '@' + user.username;
    const profileScores = document.getElementById("profile-scores");
    if (profileScores) {
        user.scores.forEach(score => {
            profileScores.innerHTML +=
                `<tr>
                    <td>${score.gameName}</td>
                    <td>${score.date}</td>
                    <td>${score.score}</td>
                </tr>`;
        });
    }
}

export { profileView };