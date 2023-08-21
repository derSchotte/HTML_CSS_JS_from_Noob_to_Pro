// Auswahl aller Elemente mit der Klasse 'memory-card'
const cards = document.querySelectorAll('.memory-card');

// Initialisierung von Variablen zur Kontrolle des Spielverlaufs
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Funktion zum Umdrehen einer Karte
function flipCard() {
    // Wenn das Spielfeld gesperrt ist oder die erste Karte bereits ausgewählt wurde, wird die Funktion beendet
    if (lockBoard) return;
    if (this === firstCard) return;

    // Fügt die Klasse 'flip' hinzu, um die Karte zu drehen
    this.classList.add('flip');

    // Überprüft, ob es sich um die erste aufgedeckte Karte handelt
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Weist die zweite Karte zu und prüft auf Übereinstimmung
    secondCard = this;
    checkForMatch();
}

// Funktion zum Überprüfen, ob zwei Karten übereinstimmen
function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    // Ruft entsprechende Funktion auf, abhängig davon, ob die Karten übereinstimmen oder nicht
    isMatch ? disableCards() : unflipCards();
}

// Funktion zum Deaktivieren der Klick-Events für passende Karten
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    // Setzt das Spielfeld zurück
    resetBoard();
}

// Funktion zum Zurückdrehen der Karten, wenn sie nicht übereinstimmen
function unflipCards() {
    lockBoard = true;

    // Verzögert das Zurückdrehen der Karten und das Zurücksetzen des Spielfelds
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

// Funktion zum Zurücksetzen des Spielfelds
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Selbstaufrufende Funktion zum Mischen der Karten
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

// Hinzufügen eines Klick-EventListeners zu jeder Karte
cards.forEach(card => card.addEventListener('click', flipCard));
