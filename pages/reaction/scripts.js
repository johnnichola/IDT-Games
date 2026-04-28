let isPlaying = false;
let shouldClick = false;
let isFailed = false;
let start;
let button = document.getElementById("fullscreen-button");
let countdown;
let leaderboards = [];
let best;

function buttonFunction()
{
    if(!isPlaying)
    {
        // console.log("=========");
        // console.log(`Leaderboards: ${leaderboards}`);
        // console.log(`Leaderboards length: ${leaderboards.length}`);
        if(isFailed)
        {
            isFailed = false;
            button.innerText = "Press to Play!";
            return;
        }
        isPlaying = true;
        button.style.backgroundColor = "#11c1ed";
        button.innerText = "Wait...";

        countdown = setTimeout(() => 
        {
            shouldClick = true;
            button.style.backgroundColor = "#27db0f";
            button.innerText = "NOW!";
            
            start = Date.now();
        }, Math.random() * 5000 + 2000);
    }
    else
    {
        button.style.backgroundColor = "#11c1ed";
        isPlaying = false;
        if(!shouldClick)
        {
            clearTimeout(countdown);
            isFailed = true;
            button.innerText = "Too soon!";
            shouldClick = false;
            return;
        }
        
        const end = Date.now();
        const timeElapsedMs = end - start;
        
        button.innerText = `${timeElapsedMs}ms.`;
        updateLeaderboards(timeElapsedMs);
        shouldClick = false;
    }
}

function updateLeaderboards(newEntry)
{
    if(best === undefined || newEntry < best)
    {
        best = newEntry;
        document.getElementById("ranking").innerText = `Best: ${best}ms`;
    }

    // if(leaderboards.length > 0)
    // {
    //     for(let i = 0; i < leaderboards.length; i++)
    //     {
    //         document.getElementById("ranking").innerText += `${i + 1}. ${leaderboards[i]}ms\n`;
    //     }
    // }
    // if(leaderboards.length == 0)
    // {
    //     leaderboards.push(newEntry);
    //     return;
    // }
    // for(let i = 0; i < leaderboards.length; i++)
    // {
    //     if(leaderboards.includes(newEntry))
    //         return;
    //     else
    //         leaderboards.push(newEntry);
    // }
}