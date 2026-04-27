
let cards = ["K", "Q", "J", "A"];
let playerCards = [];
let dealerCards = [];
let playerValue = 0;
let dealerValue = 0;

let startingGold = 2000;
var gold = 0;
let betAmount = 0;
let delayAmount = 500;

let hasStand = false;
let hasBet = false;
let hasSpent = false;
let isGameOver = false;

const startButtonElem = document.getElementById("start-button");
const playerCardsElem = document.getElementById("player-cards");
const playerCardValueElem = document.getElementById("player-card-count");
const dealerCardsElem = document.getElementById("dealer-cards");
const dealerCardValueElem = document.getElementById("dealer-card-count");
const gameStateElem = document.getElementById("game-state");
const goldElem = document.getElementById("gold-text");
const playerCardContainerElem = document.getElementById("player-card-container");
const dealerCardContainerElem = document.getElementById("dealer-card-container");

const bet100Elem = document.getElementById("bet-100");
const bet200Elem = document.getElementById("bet-200");
const bet500Elem = document.getElementById("bet-500");
const bet1000Elem = document.getElementById("bet-1000");

addGold(startingGold);
startGame();

startButtonElem.style.display = "none";

// Handles the card hover function
// document.addEventListener('DOMContentLoaded', (event) =>
// {
//     const customCursor = document.getElementById('customCursor');
//     customCursor.style.display = 'none'; // show when ready
    
//     // Initialize PLAYER cards interaction
//     playerCardContainerElem.addEventListener("mouseover", (e) =>
//     {
//         if(e.target.classList.contains("player-card"))
//         {
//             customCursor.src = e.target.dataset.card;
//             customCursor.style.display = "block";
//         }
//     });

//     playerCardContainerElem.addEventListener("mouseout", (e) => 
//     {
//         if(e.target.classList.contains("player-card"))
//             customCursor.style.display = "none";
//     });

//     // Initialize DEALER cards interaction
//     dealerCardContainerElem.addEventListener("mouseover", (e) =>
//     {
//         if(e.target.classList.contains("player-card"))
//         {
//             customCursor.src = e.target.dataset.card;
//             customCursor.style.display = "block";
//         }
//     });

//     dealerCardContainerElem.addEventListener("mouseout", (e) => 
//     {
//         if(e.target.classList.contains("player-card"))
//             customCursor.style.display = "none";
//     });

//     document.addEventListener('mousemove', (e) => 
//     {
//         const cardWidth = customCursor.offsetWidth;
//         const cardHeight = customCursor.offsetHeight;

//         const padding = 50;

//         let x = e.clientX;
//         let y = e.clientY;

//         if(x + cardWidth > window.innerWidth - padding)
//             x = window.innerWidth - cardWidth - padding;

//         if(y + cardHeight > window.innerHeight - padding)
//             y = window.innerHeight - cardHeight - padding;

//         if(x < padding) x = padding;
//         if(y < padding) y = padding;

//         customCursor.style.left = `${x}px`;
//         customCursor.style.top = `${y}px`;
//     });
// });

async function startGame()
{
    disableAllButton(true);

    // Reset values
    resetGame();

    // Give dealer the cards
    for(let i = 0; i < 2; i++)
    {
        let card = getCardValue("DEALER");
        if(i == 1)
            updateCardUI("DEALER", "*");
        else
            updateCardUI("DEALER", getCardFace(card));
        dealerCards.push(card);
        await delay(delayAmount);
    }
    updateDealerValue(true);
    
    // Give player the cards
    let card = getCardValue("PLAYER");
    giveCard("PLAYER", card);

    await delay(200);
    disableAllButton(false);
}

function onHit()
{
    if(isGameOver) return;
    if(!hasBet || betAmount == 0)
    {
        gameStateElem.innerHTML = "PLACE YOUR BETS FIRST";
        return;
    }
    else if(hasBet && !hasSpent)
    {
        if(gold < betAmount)
        {
            gameStateElem.innerHTML = "Not enough Gold!";
            return;
        }
        hasSpent = true;
        spendGold(betAmount);
    }

    gameStateElem.innerHTML = "------------";
    if(!hasStand && hasBet)
        giveCard("PLAYER", getCardValue("PLAYER"));
}

async function onStand()
{
    if(isGameOver) return;
    if(!hasBet || betAmount == 0)
    {
        gameStateElem.innerHTML = "PLACE YOUR BETS FIRST";
        return;
    }
    else if(hasBet && !hasSpent)
    {
        if(gold < betAmount)
        {
            gameStateElem.innerHTML = "Not enough Gold!";
            return;
        }
        hasSpent = true;
        spendGold(betAmount);
    }
    if(hasStand) return;

    gameStateElem.innerHTML = "SHOWDOWN";
    hasStand = true;
    console.log(dealerCards);
    //dealerCardsElem.innerHTML = "";
    dealerCardContainerElem.innerHTML = "";
    for(let i = 0; i < dealerCards.length; i++)
    {
        updateCardUI("DEALER", getCardFace(dealerCards[i]));
        updateDealerValue();
        await delay(delayAmount);
    }
    

    if(dealerValue > playerValue && dealerValue <= 21)
        triggerState("LOSE");
    else
        repeatDealerCards();
}

function onBet(betValue)
{
    if(hasSpent)  return;
    if(gold < betValue)
    {
        console.log("1");
        gameStateElem.innerHTML = "Not enough gold";
        hasBet = false;
        return;
    }
    else if(gold >= betValue)
    {
        console.log("2");
        betAmount = betValue;
        hasBet = true;
    
        goldElem.innerHTML = "GOLD: " + (gold - betValue);
    
        const betButtons = document.querySelectorAll(".bet-btn");
        betButtons.forEach(btn => 
        {
            btn.addEventListener("click", () => 
            {
                betButtons.forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
            });
        }
        );
    }

    console.log("Bet Value: " + betValue);
}

function resetGame()
{
    playerCards = [];
    dealerCards = [];
    playerValue = 0;
    dealerValue = 0;
    playerCardValueElem.innerHTML = "0";
    dealerCardValueElem.innerHTML = "0";
    gameStateElem.innerHTML = "------------";
    playerCardContainerElem.innerHTML = "";
    dealerCardContainerElem.innerHTML = "";
    gameStateElem.style.color = "black";
    hasStand = false;
    hasSpent = false;
    isGameOver = false;

    goldElem.innerHTML = "GOLD: " + gold;
    startButtonElem.classList.remove("selected");
    startButtonElem.style.display = "none";
}

function resetAllBetButtons()
{
    const betButtons = document.querySelectorAll(".bet-btn");
    betButtons.forEach(btn => 
    {
        betButtons.forEach(b => b.classList.remove("selected"));
    }
    );
}

function giveCard(charType, card)
{
    updateCardUI(charType, getCardFace(card));
    switch(charType)
    {
        case "PLAYER":
            playerCards.push(card);
            updatePlayerValue();

            console.log("Join: " + playerCards.join(" | ")); // seperate values by |

            if(playerValue > 21)
                triggerState("LOSE");
            else if (playerValue == 21)
                triggerState("WIN");
            break;
        case "DEALER":
            dealerCards.push(card);
            updateDealerValue();
            break;
    }
}

function repeatDealerCards()
{
    setTimeout(() => 
    {
        do
        {
            giveCard("DEALER", getCardValue("DEALER"));
        }
        while(dealerValue < playerValue);

        triggerState((dealerValue > playerValue && dealerValue <= 21) ? "LOSE" : "WIN");

    }, 1500);
}

function triggerState(state)
{
    gameStateElem.innerHTML = state == "WIN" ? "YOU WIN" : "YOU LOSE";
    gameStateElem.style.color = state == "WIN" ? "#34cfeb" : "#ff828f";
    isGameOver = true;

    if(state == "WIN")
        addGold((betAmount * 2));

    startButtonElem.style.display = "inline-block";
    startButtonElem.classList.add("selected");
}

function addGold(value)
{
    gold += value;
    goldElem.innerHTML = "GOLD: " + gold;
}
function spendGold(value)
{
    gold -= value;
    goldElem.innerHTML = "GOLD: " + gold;
}

function updateCardUI(owner, value)
{
    let cardSrc = `assets/cards/${value}_card.png`;
    const card = document.createElement("img");

    if(value == "*")
        cardSrc = "assets/cards/back_card.png";

    card.src = cardSrc;
    card.dataset.card = cardSrc;
    card.classList.add("player-card");

    if(owner == "PLAYER")
        playerCardContainerElem.appendChild(card);
    else if(owner == "DEALER")
        dealerCardContainerElem.appendChild(card);
}

function updatePlayerValue()
{
    playerValue = 0;
    for(let i = 0; i < playerCards.length; i++)
    {
        console.log("Card Value: " + playerCards[i]);
        playerValue += playerCards[i];
    }
    playerCardValueElem.innerHTML = playerValue;
}
function updateDealerValue(isStart)
{
    dealerValue = 0;
    if(isStart)
    {
        console.log("Enemy Card: " + dealerCards[0]);
        dealerValue += dealerCards[0];
    }
    else
    {
        for(let i = 0; i < dealerCards.length; i++)
        {
            dealerValue += dealerCards[i];
        }
    }
    dealerCardValueElem.innerHTML = dealerValue;
}

/*
    Get random number from 1 to 4
    If chosen == 1 then get from cards
    else get random number from 2 to 7
 */
function getCardValue(charType)
{
    let rand = getRandomNumber(1, 4);
    if(rand == 1) // get face cards
    {
        let faceCard = getRandomItem(cards);
        let cardValue = 0;

        console.log("Face Card: " + faceCard);
        if(faceCard != "A") cardValue = 10;
        else
        {
            // Get player card value first 
            var pCardCount = charType == "PLAYER" ? playerValue : dealerValue;
            console.log("pCardCount: " + pCardCount + " || " + (pCardCount + 11));
            var isHigh = ((pCardCount + 11) > 21);
            console.log("IsHigh: " + isHigh);
            cardValue = ((pCardCount + 11) > 21) ? 1 : 11;
        }

        return cardValue;
    }
    else
        return getRandomNumber(2, 10);
}

function getCardFace(value)
{
    if(value == 1 || value == 11) return "A";
    else if (value == 10)
    {
        var faceCards = ["K", "Q", "J"];
        return getRandomItem(faceCards);
    }
    
    return value;
}

function getRandomNumber(min, max)
{
    return parseInt(Math.random() * (max - min) + min);
}

function getRandomItem(arr)
{
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
}

function disableAllButton(isDisable)
{
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = isDisable;
    });
}

function delay(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}