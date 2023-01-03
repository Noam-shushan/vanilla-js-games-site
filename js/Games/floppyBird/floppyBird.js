import { profileView } from "../../views/profile.js";
import { getCurrentUser , setCurrentUser} from "../../storageHandler.js";
let user = getCurrentUser();

let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

// load images
let bird = new Image();
bird.src = "images/bird.png";
let bg = new Image();
bg.src = "images/bg.png";
let fg = new Image();
fg.src = "images/fg.png";
let pipeNorth = new Image();
pipeNorth.src = "images/pipeNorth.png";
let pipeSouth = new Image();
pipeSouth.src = "images/pipeSouth.png";

// audio files
let fly = new Audio();
fly.src = "sounds/fly.mp3";
let scor = new Audio();
scor.src = "sounds/score.mp3";
let oneTime=true

function updateUser(user, setCurrentUser, score) {
    if (user && score > 0 && oneTime) {
        user.scores.push({
            gameName: "Floppy Bird",
            date: new Date().toLocaleString(),
            score: score
        });
        setCurrentUser(user);
        profileView(user);
        updateTbl(user)
        oneTime = false
    }
}

function play() {
    updateTbl(user)

    // on key down
    document.addEventListener("keydown", (e) => {
        // Start the game if enter key is pressed
        if ((e.key == 'w' || e.key == "'") && game_state != 'End') {
            bY -= 32;
            if (bY < 4)
                bY = 4
            fly.play();
        }
        // Start the game if enter key is pressed
        if (e.key == 'Enter' && game_state != 'Play') {
            // some letiables
            gap = 110;
            bX = 10;
            bY = 150;
            score = 0;
            game_state = 'Play';
            oneTime =true;
            
            // pipe coordinates
            pipe = [];
            pipe[0] = {
                x: cvs.width,
                y: 0
            };
            draw()
        }
    });

    // some letiables
    let gap = 110;
    let constant;
    let bX = 10;
    let bY = 150;
    let gravity = 1.8;
    let score = 0;
    
    // pipe coordinates
    let pipe = [];
    pipe[0] = {
        x: cvs.width,
        y: 0
    };

    // Setting initial game state to start
    let game_state = 'Play';

    // draw images
    function draw() {
        // Detect if game has ended
        if (game_state == 'End') return;
        ctx.drawImage(bg, 0, 0);
        for (let i = 0; i < pipe.length; i++) {
            constant = pipeNorth.height + gap;
            ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
            ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
            pipe[i].x--;
            if (pipe[i].x == 110) {
                pipe.push({
                    x: cvs.width,
                    y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
                });
            }
            // detect collision
            if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= cvs.height - fg.height) {
                game_state = 'End';
                updateUser(user, setCurrentUser, score);
            }
            if (pipe[i].x == 5) {
                score++;
                scor.play();
                gap--;
            }
        }
        ctx.drawImage(fg, 0, cvs.height - fg.height);
        ctx.drawImage(bird, bX, bY);
        bY += gravity;
        ctx.fillStyle = "#000";
        ctx.font = "20px Verdana";
        ctx.fillText("Score : " + score, 10, cvs.height - 20);
        requestAnimationFrame(draw);
    }
    draw();
}

function updateTbl(user){
    if(user && user.scores)
    {
        let tbl = document.getElementById("myTable");

        let bestFiveScoresPerGame = user.scores.reduce((acc, score) => {
            if (!acc[score.gameName]) {
                acc[score.gameName] = [];
            }
            acc[score.gameName].push(score);
            return acc;
        }, {});

        bestFiveScoresPerGame["Floppy Bird"] = bestFiveScoresPerGame["Floppy Bird"]
                        .sort((a, b) => b.score - a.score)
                        .slice(0, 3);

        tbl.innerHTML=
        `<caption>Top scores</caption>
        <tr>
            <th>score</th>
            <th>date</th>
        </tr>`;

        for (let i = 0; i < bestFiveScoresPerGame["Floppy Bird"].length; i++) {
            tbl.innerHTML +=
                `<tr>
                    <td>${bestFiveScoresPerGame["Floppy Bird"][i].score}</td>
                    <td>${bestFiveScoresPerGame["Floppy Bird"][i].date}</td>
                </tr>`;
        }
    }
}

export { play }