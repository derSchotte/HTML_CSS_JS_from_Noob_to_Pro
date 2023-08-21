const darkModeToggle = document.querySelector('#dark-mode-toggle');
let btnDarkModeIcon = document.getElementById('btn-darkmode-icon');

const updateMode = (enable) => {
    const mode = enable ? 'darkmode' : 'lightmode';
    const oppositeMode = !enable ? 'darkmode' : 'lightmode';
    const btnMode = enable ? 'btn-darkmode' : 'btn-lightmode';
    const btnOppositeMode = !enable ? 'btn-darkmode' : 'btn-lightmode';

    document.body.classList.remove(oppositeMode);
    document.body.classList.add(mode);

    if (btnDarkModeIcon) {
        btnDarkModeIcon.classList.remove(btnOppositeMode);
        btnDarkModeIcon.classList.add(btnMode);
    }

    localStorage.setItem('darkMode', enable ? 'enabled' : null);
}

const toggleDarkMode = () => {
    let darkMode = localStorage.getItem('darkMode') === 'enabled';
    updateMode(!darkMode);
    console.log(`Dark Mode is ${!darkMode ? 'enabled' : 'disabled'}`);
};

// Set initial mode based on local storage
updateMode(localStorage.getItem('darkMode') === 'enabled');

// Add event listener to the toggle button
darkModeToggle.addEventListener('click', toggleDarkMode);
