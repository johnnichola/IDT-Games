let gold = 0;


export function addGold(value)
{
    
    gold = getGold();
    gold += value;
    localStorage.setItem("gold", gold.toString());
    alert(`You gained ${value} gold!`);
    console.log("Added gold: " + value + " || Total Gold: " + gold);
}

export function spendGold(value)
{
    gold = getGold();
    gold -= value;
    localStorage.setItem("gold", gold.toString());
    console.log("Spent Gold: " + value + " || Total Gold: " + gold);
}

export function getGold()
{ 
    if(localStorage.getItem("gold") === null)
    {
        console.log("gold save does not exist, creating one...");
        localStorage.setItem("gold", "0");
    }
    return parseInt(localStorage.getItem("gold")); 
}