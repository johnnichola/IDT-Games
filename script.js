
const inputField = document.getElementById("guess-input");
const guessAlert = document.getElementById("guess-alert");
const guessCountText = document.getElementById("guess-count");
const restartBtn = document.getElementById("restart-btn");


// ----- Guess Page -----
let guessCount = 0;
let guessTargetNum = 0;

initGuessPage();

function generateRandomNum()
{
    guessTargetNum = Math.floor(Math.random() * 100) + 1;
}
function initGuessPage()
{
    generateRandomNum();
    restartBtn.addEventListener('click', function()
    {
        restartBtn.classList.remove("d-none");
        guessCount = 0;
        guessCountText.innerHTML = "Guess Count: 0";
        guessAlert.innerHTML = "";
        restartBtn.classList.add("d-none");

        generateRandomNum();
    });
    inputField.addEventListener('keydown', function(event)
    {
        if(event.key == "Enter")
        {
            console.log("I hate magic: " + inputField.value);

            if(inputField.value == guessTargetNum)
            {
                alert("Congratulations! You guessed the correct number: " + guessTargetNum);
                guessAlert.innerHTML = "";
                restartBtn.classList.remove("d-none");
            }
            else
            {
                guessCount++;
                guessCountText.innerHTML = "Guess Count: " + guessCount;

                if(inputField.value > guessTargetNum)
                    guessAlert.innerHTML = "Too high! Try again.";
                else
                    guessAlert.innerHTML = "Too low! Try again.";
            }

            inputField.value = "";
        }
    });
}
// ----- END GUESS PAGE -----

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