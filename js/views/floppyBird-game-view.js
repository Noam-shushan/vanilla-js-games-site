import { play } from "../Games/floppyBird/floppyBird.js";
import { getCurrentUser , setCurrentUser} from "../storageHandler.js";

let user = getCurrentUser()
console.log("hi")
play(user,setCurrentUser);