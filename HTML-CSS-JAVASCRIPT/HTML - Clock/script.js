// Erstellen Sie ein Objekt mit Elementen, die durch ihre ID von der Seite erfasst werden.
const elements = ['seconds', 'minutes', 'hours', 'seconds-digital',
    'minutes-digital', 'hours-digital', 'ampm-digital',
    'day-name', 'month-name', 'day-number', 'year-number']
    .reduce((acc, id) => ({ ...acc, [id]: document.getElementById(id) }), {});

// Array von Wochentagen und Monaten
const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec'];

// Funktion, um eine führende Null hinzuzufügen, wenn der Wert kleiner als 10 ist
function padZero(val) {
    return val < 10 ? `0${val}` : val;
}

// Funktion zum Aktualisieren des Datums
function updateDate() {
    const date = new Date();

    // Setzen Sie den Tag, Monat, Datum und Jahr basierend auf dem aktuellen Datum
    elements["day-name"].innerHTML = days[date.getDay()];
    elements["month-name"].innerHTML = months[date.getMonth()];
    elements["day-number"].innerHTML = date.getDate();
    elements["year-number"].innerHTML = date.getFullYear();
};

// Funktion zum Aktualisieren der Uhrzeit
function updateClock() {
    const date = new Date();
    const secVal = date.getSeconds();
    const minVal = date.getMinutes();
    const hourVal = date.getHours();

    // Berechnen Sie den Sekunden-, Minuten- und Stundenzeiger der Uhr
    const sec = secVal / 60;
    const min = (sec + minVal) / 60;
    const hour = (min + hourVal) / 12;

    // Drehen Sie die Zeiger entsprechend der berechneten Zeit
    elements.seconds.style.transform = `rotateZ(${sec * 360}deg)`;
    elements.minutes.style.transform = `rotateZ(${min * 360}deg)`;
    elements.hours.style.transform = `rotateZ(${hour * 360}deg)`;

    // Setzen Sie die digitale Uhrzeit und das AM/PM-Symbol
    elements["seconds-digital"].innerHTML = padZero(secVal);
    elements["minutes-digital"].innerHTML = padZero(minVal);
    elements["hours-digital"].innerHTML = padZero(hourVal % 12 || 12);
    elements["ampm-digital"].innerHTML = hourVal < 12 ? 'am' : 'pm';
};

// Aktualisieren Sie die Uhr und das Datum sofort
updateClock();
updateDate();

// Dann aktualisieren Sie die Uhr jede Sekunde
setInterval(updateClock, 1000);
