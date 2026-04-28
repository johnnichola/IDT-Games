const chestBtn = document.getElementById("chest-button");
const chestImg = document.getElementById("chest-sprite");
const whiteFlash = document.getElementById("white-flash");
const resetBtn = document.getElementById("reset-button");

// sections
const chestSection = document.getElementById("chest-section");
const cardSection = document.getElementById("card-section");
const cardRevealSection = document.getElementById("card-reveal-section");

chestBtn.addEventListener('click', () => 
{
    chestBtn.disabled = true;
    chestImg.classList.add("chest-sprite-anim");
    console.log("Chest clicked!");  

    playChestAnim();
});

resetBtn.addEventListener('click', resetGacha);

async function playChestAnim()
{
    const _chosenCard = getRandomCard();

    await delay(500);

    whiteFlash.classList.remove('d-none');
    whiteFlash.classList.add('flash-anim');

    await delay(1000);

    chestSection.classList.add('d-none');
    cardSection.classList.remove('d-none');

    const _allCards = document.querySelectorAll('#cards > div');
    _allCards.forEach(card => 
    {
        card.addEventListener('click', () =>
        {
            cardSection.classList.add('d-none');
            cardRevealSection.classList.remove('d-none');
        });
    });

    anime(
        {
            targets: cardRevealSection,
            translateX: [-10, 10],
            duration: 100,
            direction: 'alternate',
            loop: 20,
            easing: 'easeInOutSine',
            complete: (anim) =>
            {
                anime({
                    targets: cardRevealSection,
                    translateX: 0,
                    duration: 100
                });
                
                document.getElementById("chosen-card").src = _chosenCard;
                document.getElementById("card-rarity-type").classList.remove('d-none');
                resetBtn.classList.remove('d-none');
                console.log("Chosen Card: " + _chosenCard);
            }
        }
    );
}

function getRandomCard()
{
    const _randNum = Math.floor(Math.random() * 5) + 1;
    let _prefix = "";

    // Face cards
    if (_randNum == 2)
    {
        const _faceCards = ["K", "Q", "J", "A"];
        _prefix = _faceCards[Math.floor(Math.random() * _faceCards.length) + 1];
    }
    else
        _prefix = Math.floor(Math.random() * 9) + 1;

    
    return `../blackjack/assets/cards/${_prefix}_card.png`;
}

function resetGacha()
{
    cardRevealSection.classList.add('d-none');
    whiteFlash.classList.add('d-none');
    whiteFlash.classList.remove('flash-anim');
    chestSection.classList.remove('d-none');
    cardSection.classList.add('d-none');
    resetBtn.classList.add('d-none');
    chestImg.classList.remove("chest-sprite-anim");

    document.getElementById("chosen-card").src = "../blackjack/assets/cards/back_card.png";
    document.getElementById("card-rarity-type").classList.add('d-none');

    chestBtn.disabled = false;
}

function delay(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}