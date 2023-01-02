function saveData(storageName, data) {
    let dataArr = getData(storageName);
    dataArr.push(data);
    const dataString = JSON.stringify(dataArr);
    localStorage.setItem(storageName, dataString);
}

function getData(storageName) {
    const dataString = localStorage.getItem(storageName);
    if (!dataString) {
        return [];
    }
    let res = JSON.parse(dataString);
    return res;
}

/**
 * Get the current user from the session storage
 * @returns {
 *      username: string,
 *      password: string,
 *      firstName: string,
 *      lastName: string
 *      scores: [{
 *          score: number,
 *          date: Date
 *          gameName: string
 *          }
 *      ]
 * }
 * user object or null if no user is logged in
 */
function getCurrentUser() {
    let currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        return null;
    }
    return JSON.parse(currentUser);
}

function setCurrentUser(user) {
    let userJson = JSON.stringify(user);
    sessionStorage.setItem('currentUser', userJson);
    let users = getData("users");
    let userIndex = users.findIndex(u => u.username === user.username);
    if (userIndex !== -1) {
        users[userIndex] = user;
    } else {
        users.push(user);
    }
    const dataString = JSON.stringify(users);
    localStorage.setItem("users", dataString);
}

export { saveData, getData, getCurrentUser, setCurrentUser };