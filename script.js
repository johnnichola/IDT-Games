
const inputField = document.getElementById("guess-input");
const guessAlert = document.getElementById("guess-alert");
const guessCountText = document.getElementById("guess-count");
let guessCount = 0;

guessMagic();
function guessMagic()
{
    const _randNum = Math.floor(Math.random() * 100) + 1;
    inputField.addEventListener('keydown', function(event)
    {
        if(event.key == "Enter")
        {
            console.log("I hate magic: " + inputField.value);

            if(inputField.value == _randNum)
            {
                alert("Congratulations! You guessed the correct number: " + _randNum);
                guessCount = 0;
                guessCountText.innerHTML = "Guess Count: 0";
                guessAlert.innerHTML = "";
            }
            else
            {
                guessCount++;
                guessCountText.innerHTML = "Guess Count: " + guessCount;

                if(inputField.value > _randNum)
                    guessAlert.innerHTML = "Too high! Try again.";
                else
                    guessAlert.innerHTML = "Too low! Try again.";
            }

            inputField.value = "";
        }
    });
}


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