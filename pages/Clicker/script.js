import * as Main from '../../main.js';

const atkButton = document.getElementById("atk-button");
const enemyHP = document.getElementById("enemy-hp");
const enemyLvl = document.getElementById("enemy-lvl");
const enemyImg = document.getElementById("enemy-image");
const ugPanel = document.getElementById("ug-panel");
const dmgUg = document.getElementById("dmg-ug");
const clickUg = document.getElementById("click-ug");

let currentDmg = 1;
let dmgPerSec = 0;
let currentDmgPerSec = 0;

let currentEnemyLvl = 1;
let currentEnemyHp = 5;
let enemyMaxHP = 5;

alert("Reach Lvl 5 to earn 2 global gold for Gacha!");

atkButton.addEventListener("click", () => {damageEnemy(currentDmg);});
dmgUg.addEventListener("click", () => 
{
    currentDmg += 1;
    showUgPanel(false);
});
clickUg.addEventListener("click", () => 
{
    dmgPerSec = currentDmgPerSec;
    dmgPerSec += 1;
    currentDmgPerSec = dmgPerSec;
    showUgPanel(false);
});

setInterval(() => {
    damageEnemy(dmgPerSec);
}, 1000);

function damageEnemy(dmg)
{
    currentEnemyHp -= dmg;
    enemyHP.textContent = `HP: ${currentEnemyHp} / ${enemyMaxHP}`;

    if(currentEnemyHp <= 0) levelUpEnemy();

    const hpFill = document.getElementById("hp-fill");
    const percent = (currentEnemyHp / enemyMaxHP) * 100;
    hpFill.style.width = percent + "%";
}

function levelUpEnemy()
{
    currentEnemyLvl += 1;
    localStorage.setItem("CurrentLvl", currentEnemyLvl.toString());
    console.log("Curr Lvl: " + localStorage.getItem("CurrentLvl"));
    
    enemyLvl.textContent = `Lv. ${currentEnemyLvl}`;
    enemyMaxHP += 5;
    currentEnemyHp = enemyMaxHP;
    enemyHP.textContent = `HP: ${currentEnemyHp} / ${enemyMaxHP}`;

    const num = Math.floor(Math.random() * 3) + 1;
    console.log(`enemy${num}`);
    enemyImg.src = `assets/enemies/enemy${num}.png`;
    showUgPanel(true);

    // Add 2 gold when you reach lvl 5
    if(currentEnemyLvl == 5)
        Main.addGold(2);
}

function showUgPanel(isShow)
{
    var _tempDmg = currentDmgPerSec; // cache the damage per second temporarily
    if(isShow)
    {
        ugPanel.classList.remove("hidden"); 

        dmgPerSec = 0; // temporary stop the auto dmg if menu is open
    } 
    else
    {
        ugPanel.classList.add("hidden");

        dmgPerSec = _tempDmg;
    }
}