/**
 * Save the given data in the local storage with the given storage name
 * @param {string} storageName 
 * @param {*} data the data to save in the local storage 
 */
function saveData(storageName, data) {
    let dataArr = getData(storageName);
    dataArr.push(data);
    const dataString = JSON.stringify(dataArr);
    localStorage.setItem(storageName, dataString);
}

/**
 * Get the data of the given storage name from the local storage
 * @param {string} storageName 
 * @returns the data of the given storage name
 */
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
 * @returns {User} the current user
 * user object or null if no user is logged in
 */
function getCurrentUser() {
    let currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        return null;
    }
    return JSON.parse(currentUser);
}

/**
 * Set the current user in the session storage
 * @param {User} user 
 */
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