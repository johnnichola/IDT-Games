const atkButton = document.getElementById("atk-button");
const enemyHP = document.getElementById("enemy-hp");
const enemyImg = document.getElementById("enemy-image");
const ugPanel = document.getElementById("ug-panel");
const dmgUg = document.getElementById("dmg-ug");
const clickUg = document.getElementById("click-ug");

let currentDmg = 1;
let dmgPerSec = 0;

let currentEnemyHp = 10;
let enemyMaxHP = 10;

atkButton.addEventListener("click", () => {damageEnemy(currentDmg);});
dmgUg.addEventListener("click", () => 
{
    currentDmg += 1;
    showUgPanel(false);
});
clickUg.addEventListener("click", () => 
{
    dmgPerSec += 1;
    showUgPanel(false);
});

setInterval(() => {
    damageEnemy(dmgPerSec);
}, 1000);

function damageEnemy(dmg)
{
    console.log("Attack button clicked!");
    currentEnemyHp -= dmg;
    enemyHP.textContent = `HP: ${currentEnemyHp} / ${enemyMaxHP}`;

    if(currentEnemyHp <= 0) levelUpEnemy();

    const hpFill = document.getElementById("hp-fill");
    const percent = (currentEnemyHp / enemyMaxHP) * 100;
    hpFill.style.width = percent + "%";
}

function levelUpEnemy()
{
    enemyMaxHP += 10;
    currentEnemyHp = enemyMaxHP;
    enemyHP.textContent = `HP: ${currentEnemyHp} / ${enemyMaxHP}`;

    const num = Math.floor(Math.random() * 3) + 1;
    console.log(`enemy${num}`);
    enemyImg.src = `assets/enemies/enemy${num}.png`;

    showUgPanel(true);
}

function showUgPanel(isShow)
{
    if(isShow) ugPanel.classList.remove("hidden");
    else ugPanel.classList.add("hidden");
}