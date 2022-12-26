function saveData(storageName, data) {
    let dataArr = getData();
    dataArr.push(data);
    const dataString = JSON.stringify(dataArr);
    localStorage.setItem(storageName, dataString);
}

function getData(storageName) {
    const dataString = localStorage.getItem(storageName);
    if (!dataString) {
        return [];
    }
    return JSON.parse(dataString);
}

export { saveData, getData };