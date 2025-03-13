let WinArray = [[0, 1, 2], [3, 4, 5], [6, 7, 8],    //row vise
[0, 3, 6], [1, 4, 7], [2, 5, 8],    //column vise
[0, 4, 8], [2, 4, 6]];           //diagonaly


let Msg = document.querySelector("h1");
let TicBoxes = document.querySelectorAll(".box");
let RestartBtn = document.querySelector(".ReSetBtn");
let StartBtn = document.getElementsByClassName("StartBtn");
let Player = true;  //guid the player whose turn 
let count = 0; //count the number of TicBoxes are filled with X / O


const WinSound = new Audio("WinSound.mp3");
const ErrorSound = new Audio("errorSound.mp3");
const ResetSound = new Audio("GameStart.mp3");
const TapSound = new Audio("bubblepop-254773.mp3");


TicBoxes.forEach((i) => {
    i.addEventListener("click", () => {
        TapSound.play();
        if (Player === true) {
            i.classList.add("blue");
            Player = false;
            i.innerHTML = 'O';
        }
        else {
            i.classList.add("red");
            Player = true;
            i.innerHTML = 'X';
        }
        count++;
        i.style.pointerEvents = 'none'; //disable the TicBoxes after one click
        if (count >= 4) {
            winner();
        }
    });
});

function winner() {
    for (let W of WinArray) {
        console.log(W);
        let Position1 = TicBoxes[W[0]].innerText;
        let Position2 = TicBoxes[W[1]].innerText;
        let Position3 = TicBoxes[W[2]].innerText;
        if (Position1 !== "" && Position2 !== "" && Position3 !== "") {
            if (Position1 === Position2 && Position2 === Position3) {
                TicBoxes[W[0]].classList.add("WinHighLight");
                TicBoxes[W[1]].classList.add("WinHighLight");
                TicBoxes[W[2]].classList.add("WinHighLight");
                Msg.innerText = `${ Position1 } is Winner!`;
                disabledAllBtn();
                WinSound.play();
                return;
            }
        }
    }
    if (count == 9) {
        Msg.innerText = "Match Draw!";
        disabledAllBtn();
        ErrorSound.play();
        return;
    }
}

function disabledAllBtn() {
    TicBoxes.forEach((B) => {
        B.style.pointerEvents = 'none';    //disable all TicBoxes
    });
}

RestartBtn.addEventListener("click", () => {
    ResetSound.play();
    count = 0;
    Msg.innerText = "Tic Toe Game";
    TicBoxes.forEach((I) => {
        I.style.pointerEvents = 'auto';    //Inable all Ticboxes
        I.innerText = "";
        I.classList.remove("blue");
        I.classList.remove("red");
        I.classList.remove("WinHighLight");
    })
});