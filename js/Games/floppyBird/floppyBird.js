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

function updateUser(user,setCurrentUser,score,date)
{
    user.scores.push({game:"floppyBird",score: score,time:date})
    setCurrentUser(user)
}

function play(user,setCurrentUser) {

    // some letiables
    let gap = 110;
    let constant;
    let bX = 10;
    let bY = 150;
    let gravity = 1.8;
    let score = 0;

    // on key down
    document.addEventListener("keydown", (e) => {
        // Start the game if enter key is pressed
        if ((e.key == 'w' || e.key == "'") && game_state != 'End') {
            bY -= 32;
            if (bY < 4)
                bY = 4
            fly.play();
        }
    });

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
                updateUser(user,setCurrentUser,score,Date())
                ////location.reload(); // reload the page
                document.addEventListener("keydown", (e) => {
                    // Start the game if enter key is pressed
                    if (e.key == 'Enter' && game_state != 'Play') {
                        play();
                    }
                });
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

export { play }
