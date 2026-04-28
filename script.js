
import * as Main from './main.js';

// scroll to specific area
document.getElementById("scroll-btn").addEventListener('click', (event) => 
{
    event.preventDefault();

    const _targetElem = document.getElementById("arcade-anthology");
    const _navH = 72; // current height of the nav
    
    // get the top position of the arcade-anthology element
    const _elemPos = _targetElem.getBoundingClientRect().top;

    // set offset so it gives padding on the arcade-anthology element
    const _offsetPos = _elemPos + window.pageYOffset - _navH;

    window.scrollTo(
        {
            top: _offsetPos,
            behavior: "smooth"
        }
    );
});