
import * as Main from '../../main.js';

const targetButton = document.getElementById("move-button");
const container = document.getElementById("container");

let isStart = false;
let hasPressed = false;
let startTime;
let endTime;

let bestScore = 99999;
let cdTimer = 10;

let pressCount = 0;
let reactionList = [];

let countdown;

let hasGottenReward = false;

alert("Reach 550ms or below to gain 2 global gold for Gacha!");

targetButton.disabled = true;

document.getElementById("start-button").addEventListener('click', startButton);

function startMenu()
{
    let username;
    do { username = prompt("Enter username(Max characters: 7):"); }
    while(username.length > 7);
}

function getRandNumber(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Attached to the targetButton
function onClickTarget() {
    if(!isStart && hasPressed)
    {
        startGame();
        moveTargetToRandom();
        return;
    }

    if(isStart)
    {
        endTime = Date.now();

        const elapsed = endTime - startTime;
        reactionList.push(elapsed);
        pressCount++;
    }
    startTime = Date.now();

    moveTargetToRandom();
}

function startGame()
{
    isStart = true;
    startTime = Date.now();
    countdown = setInterval(timer, 1000);
}

function startButton()
{
    targetButton.disabled = false;

    hasPressed = true;
    document.getElementById("cdtimer").innerHTML = cdTimer;
}

function moveTargetToRandom()
{
    const containerWidth = container.clientWidth - targetButton.clientWidth;
    const containerHeight = container.clientHeight - targetButton.clientHeight;

    const randomX = getRandNumber(0, containerWidth);
    const randomY = getRandNumber(0, containerHeight);

    anime(
        {
            targets: targetButton,
            translateX: randomX + "px",
            translateY: randomY + "px",
            duration: 50,
            ease: 'linear'
        }
    );
}
function onLeave()
{
    console.log("Left");
}

function timer()
{
    cdTimer -= 1;
    document.getElementById("cdtimer").innerHTML = cdTimer;

    if(cdTimer <= 0) endGame();
}

function endGame()
{
    clearInterval(countdown);

    targetButton.disabled = true;
    targetButton.removeEventListener("click", onClickTarget);

    console.log(reactionList);

    let totalReact = 0;
    for(let i = 0; i < reactionList.length; i++)
    {
        totalReact += parseInt(reactionList[i]);
    }

    let reactSummary = roundUp((totalReact / reactionList.length), 1);

    document.getElementById("cdtimer").innerHTML = "React Time: " + reactSummary + "ms";

    isStart = false;
    targetButton.addEventListener("click", onClickTarget);
    reactionList = [];
    cdTimer = 10;

    if(reactSummary < bestScore)
    {
        bestScore = reactSummary;
        document.getElementById("best").innerHTML = "BEST: " + bestScore;

        // get 2 global gold when you get 500ms and below
        if(bestScore <= 550 && !hasGottenReward)
        {
            hasGottenReward = true;
            Main.addGold(2);
        }
    }

    console.log("Total Reaction Time: " + reactSummary + "ms");
}

function roundUp(num, precision)
{
    precision = Math.pow(10, precision);
    return Math.ceil(num * precision) / precision;
}

targetButton.addEventListener("click", onClickTarget);