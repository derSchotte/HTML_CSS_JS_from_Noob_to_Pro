import '../styles/main.scss';
// import '../ts/animation-typed.ts';

const tabsContainer = document.querySelector('.tabs');
const leftButton = document.querySelector('.icon-left') as HTMLElement;
const rightButton = document.querySelector('.icon-right') as HTMLElement;

let isTabsDragging = false;

const drag = (e) => {
    if(!isTabsDragging) return;
    if(tabsContainer) {
        tabsContainer.classList.add('drag');
        tabsContainer.scrollLeft -= e.movementX;
    }
};

const stop = () => {
    isTabsDragging = false;
    tabsContainer?.classList.remove('drag');
};

const scroll = (direction: number) => {
    if(tabsContainer) {
        setTimeout(() => {
            tabsContainer.scrollBy({
                top: 0,
                left: direction * 250,
                behavior: 'smooth'
            });

            const tolerance = 10;
            const maxScrollLeft = tabsContainer.scrollWidth - tabsContainer.clientWidth;

            if(tabsContainer.scrollLeft <= tolerance) {
                leftButton.style.display = 'none';
                rightButton.style.display = 'flex';
            }else if(tabsContainer.scrollLeft >= maxScrollLeft - tolerance) {
                rightButton.style.display = 'none';
                leftButton.style.display = 'flex';
            } else {
                leftButton.style.display = 'flex';
                rightButton.style.display = 'flex';
            }

        }, 10);
    }

    // if(tabsContainer) {
    //     tabsContainer.scrollLeft += direction * 100;

    //     if(tabsContainer.scrollLeft === 0) {
    //         leftButton.style.display = 'flex';
    //     } else {
    //         leftButton.style.display = 'none';
    //     }
    // }
 };

if(tabsContainer && leftButton && rightButton) {
    tabsContainer.addEventListener('mousedown', () => (isTabsDragging = true));
    tabsContainer.addEventListener('mousemove', drag);
    leftButton.addEventListener('click', () => scroll(-1));
    rightButton.addEventListener('click', () => scroll(1));
    document.addEventListener('mouseup', stop);
}