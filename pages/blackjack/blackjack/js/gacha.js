const gacha = 
{
    pullCost: 0,

    pool: 
    [
        { name: "GOLD", rarity: "COMMON", rate: 60 },
        { name: "DECK1", rarity: "UNCOMMON", rate: 25 },
        { name: "DECK2", rarity: "RARE", rate: 10 },
        { name: "DECK3", rarity: "EPIC", rate: 5 }
    ],

    pull()
    {
        if(gold >= this.pullCost)
        {
            spendGold(this.pullCost);

            const roll = Math.random() * 100;
            let cumulative = 0;

            for(let i = 0; i < this.pool.length; i++)
            {
                cumulative += this.pool[i].rate;

                if(roll < cumulative)
                {
                    console.log(`You got: ${this.pool[i].name} with ${this.pool[i].rarity} rarity `);
                    return this.pool[i];
                }
            }
        }
        else
        {
            alert("Not enough gold!");
        }
    }
};

//gacha.pull();