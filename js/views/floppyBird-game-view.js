import { play } from "../Games/floppyBird/floppyBird.js";
import { getCurrentUser , setCurrentUser} from "../storageHandler.js";

let user = getCurrentUser()

play(user,setCurrentUser);

for(let i = 0; i< user.scores.length; i++){
    console.log(user.scores[i])
}

//let table = document.getElementById("myTable");

//let row = table.insertRow(1);

// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
//let cell1 = row.insertCell(0);
//let cell2 = row.insertCell(1);

// Add some text to the new cells:
//cell1.innerHTML = "NEW CELL1";
//cell2.innerHTML = "NEW CELL2";
