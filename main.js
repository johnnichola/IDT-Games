let gold = 0;

export function addGold(value)
{
    gold = getGold();
    gold += value;
    localStorage.setItem("gold", gold.toString());
    console.log("Added gold: " + value + " || Total Gold: " + gold);
}

export function spendGold(value)
{
    gold = getGold();
    gold -= value;
    localStorage.setItem("gold", gold.toString());
    console.log("Spent Gold: " + value + " || Total Gold: " + gold);
}

export function getGold(){ return parseInt(localStorage.getItem("gold")); }