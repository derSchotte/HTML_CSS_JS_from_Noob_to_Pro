document.querySelector('button').addEventListener('click', () => {
    (e) => {
        console.log(e.target === e.currentTarget);
    }
});