const rating = document.getElementsByClassName('rating')[0];
const block = document.getElementsByClassName('block');
const counter = document.querySelector('.counter');

if(counter) {
    counter.innerText = '0';

    const dataTarget = +counter.getAttribute('data-target');
    
    const numberCounter = () => {
        const value = +counter.innerText;
        
        if(value < dataTarget) {
            counter.innerText = Math.ceil(value + 1).toString();
                        
            setTimeout(() => {
                numberCounter();
            }, 25);
        }
    }
    
    numberCounter();
}

const stripes = 80;
const degree = 360 / stripes;

let ratingValue = 0;

if(counter) {
    const ratingEValue = counter.textContent;
    ratingValue = parseInt(ratingEValue);
    
    for (let i = 0; i < stripes; i++) {
        rating.innerHTML += '<div class="block"></div>';
        block[i].style.transform = `rotate(${degree * i}deg)`;
        block[i].style.animationDelay = ( i / 40) + 's';
    }
    
    const style = document.createElement('style');
    style.innerHTML = `
    .card .rating .block:nth-child(-n+${stripes * (ratingValue / 100) + 1}) {
        background: #0f0;
        box-shadow: 0 0 0.8rem #0f0, 
        0 0 1.2rem #0f0, 
        0 0 2rem #0f0;
    }
    `;

document.head.appendChild(style);
}