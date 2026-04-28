
//#region GUESSING GAME
const inputField = document.getElementById("guess-input");
const guessCountText = document.getElementById("guess-count");
const restartBtn = document.getElementById("restart-btn");
const guessRow = document.getElementById("guess-row");
const lowestGuess = document.getElementById("highscore");
let guessCount = 0;
let guessTargetNum = 0;
let highscore = Infinity;

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
//#endregion


// this is for scrolling to specific section
function onScrollToSection(event)
{
    event.preventDefault();

    const _targetElem = document.getElementById("arcade-anthology");
    const _navH = 72; // current height of the nav
    
    // get the top position of the arcade-anthology element
    const _elemPos = _targetElem.getBoundingClientRect().top;

    // set offset so it gives padding on the arcade-anthology element
    const _offsetPos = _elemPos + window.pageYOffset - _navH;

    window.scrollTo(
        {
            top: _offsetPos,
            behavior: "smooth"
        }
    );
}