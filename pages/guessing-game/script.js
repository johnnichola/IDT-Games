
import * as Main from '../../main.js';

const inputField = document.getElementById("guess-input");
const guessCountText = document.getElementById("guess-count");
const restartBtn = document.getElementById("restart-btn");
const guessRow = document.getElementById("guess-row");
const lowestGuess = document.getElementById("highscore");
let guessCount = 0;
let guessTargetNum = 0;
let highscore = Infinity;

let hasGottenReward = false;

initGuessPage();

function generateRandomNum()
{
    guessTargetNum = Math.floor(Math.random() * 100) + 1;
    console.log("Target number: " + guessTargetNum);
}
function initGuessPage()
{
    // If we are not in the guessing game page, don't run
    if(!inputField) return;

    generateRandomNum();
    restartBtn.addEventListener('click', function()
    {
        restartBtn.classList.remove("d-none");
        guessCount = 0;
        guessCountText.innerHTML = "Guess Count: 0";
        restartBtn.classList.add("d-none");
        guessRow.innerHTML = "";
        generateRandomNum();
    });
    inputField.addEventListener('keydown', function(event)
    {
        if(event.key == "Enter")
        {
            if(inputField.value == "") return;

            const _yourInput = inputField.value;
            console.log("I hate magic: " + _yourInput);

            // IF CORRECT
            if(_yourInput == guessTargetNum)
            {
                alert("Congratulations! You guessed the correct number: " + guessTargetNum);
                guessRow.innerHTML += `<tr><th scope="row" class="text-warning">${_yourInput}</th></tr>`;
                restartBtn.classList.remove("d-none");

                // Check if highscore is beaten
                if(_yourInput < highscore)
                {
                    highscore = guessCount;
                    lowestGuess.innerHTML = guessCount;

                    // add 1 global gold if you got 4 guess or less
                    if(highscore <= 4 && !hasGottenReward)
                    {
                        hasGottenReward = true;
                        Main.addGold(1);
                    }
                }
            }
            else // IF WRONG
            {
                guessCount++;
                guessCountText.innerHTML = "Guess Count: " + guessCount;

                const _tooHigh = _yourInput > guessTargetNum;

                guessRow.innerHTML += `<tr><th scope="row" class="${_tooHigh ? 'text-primary' : 'text-danger'}">${_yourInput}</th></tr>`;
            }

            inputField.value = "";
        }
    });
}