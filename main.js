let gold = 0;

export function addGold(value)
{
    gold = getGold(); // get gold
    gold += value; // add gold based on parameter
    localStorage.setItem("gold", gold.toString()); // save data
    alert(`You gained ${value} gold!`);
    console.log("Added gold: " + value + " || Total Gold: " + gold);
}

export function spendGold(value)
{
    gold = getGold(); // get gold first
    gold -= value; // deduct it
    localStorage.setItem("gold", gold.toString()); // save the data
    console.log("Spent Gold: " + value + " || Total Gold: " + gold);
}

export function getGold()
{ 
    // if gold data does not exist, create one
    if(localStorage.getItem("gold") === null)
    {
        console.log("gold save does not exist, creating one...");
        localStorage.setItem("gold", "0");
    }
    return parseInt(localStorage.getItem("gold")); 
}