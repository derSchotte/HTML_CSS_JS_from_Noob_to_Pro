// Zugriff auf die HTML-Elemente
let display = document.getElementById('display'); // Anzeigefeld
let displayResult = document.getElementById('displayResult'); // Ergebnisfeld
let numbers = document.getElementsByClassName('num'); // Zahlentasten
let operators = document.getElementsByClassName('operator'); // Operator-Tasten
let clear = document.getElementById('clear'); // Clear-Taste
let clearEntry = document.getElementById('clearEntry'); // CE-Taste
let equals = document.getElementById('equals'); // Gleichheitszeichen-Taste
let plusMinus = document.getElementById('plusMinus'); // Plus-Minus-Taste
let percent = document.getElementById('percent'); // Prozent-Taste

// Variablen für Berechnungen
let result = null; // Ergebnisvariable
let currentOperator = null; // Aktueller Operator
let operand = null; // Operand

// Event-Listener für Zahlentasten
for (let number of numbers) {
    number.addEventListener('click', function () {
        display.value += this.value; // Fügt die Zahl zum Anzeigefeld hinzu
    });
}

// Event-Listener für Operator-Tasten
for (let operator of operators) {
    operator.addEventListener('click', function () {
        if (display.value !== '' && !display.value.includes(' ')) {
            operand = display.value; // Setzt den Operanden
            currentOperator = this.value; // Setzt den aktuellen Operator
            display.value += ' ' + currentOperator + ' '; // Fügt den Operator zum Anzeigefeld hinzu
        }
    });
}

// Event-Listener für die Gleichheitszeichen-Taste
equals.addEventListener('click', function () {
    let calculation = display.value.split(' '); // Teilt das Anzeigefeld in Operand, Operator und zweiten Operand
    if (calculation.length === 3) { // [8] [*] [8]
        operand = calculation[0]; // Setzt den Operanden
        currentOperator = calculation[1]; // Setzt den aktuellen Operator
        let secondOperand = calculation[2]; // Setzt den zweiten Operanden

        // Durchführt die Berechnung basierend auf dem Operator
        switch (currentOperator) {
            case '+':
                result = parseFloat(operand) + parseFloat(secondOperand);
                break;
            case '-':
                result = parseFloat(operand) - parseFloat(secondOperand);
                break;
            case '*':
                result = parseFloat(operand) * parseFloat(secondOperand);
                break;
            case '/':
                result = parseFloat(operand) / parseFloat(secondOperand);
                break;
        }
        displayResult.value = result; // Zeigt das Ergebnis an
        console.log(result); // Loggt das Ergebnis
        currentOperator = null; // Setzt den aktuellen Operator zurück
        operand = null; // Setzt den Operanden zurück
    }
});

// Event-Listener für die Clear-Taste
clear.addEventListener('click', function () {
    display.value = ''; // Leert das Anzeigefeld
    displayResult.value = ''; // Leert das Ergebnisfeld
    currentOperator = null; // Setzt den aktuellen Operator zurück
    operand = null; // Setzt den Operanden zurück
});

// Event-Listener für die Plus-Minus-Taste
plusMinus.addEventListener('click', function () {
    if (display.value !== '' && !isNaN(display.value)) {
        display.value = parseFloat(display.value) * -1; // Wechselt das Vorzeichen der Zahl im Anzeigefeld
    }
});

// Event-Listener für die CE-Taste
clearEntry.addEventListener('click', function () {
    let entries = display.value.split(' '); // Teilt das Anzeigefeld in seine Einträge
    if (entries.length > 1) {
        entries.pop(); // Entfernt den letzten Eintrag
        display.value = entries.join(' ') + ' '; // Fügt die verbleibenden Einträge wieder zusammen
    } else {
        display.value = ''; // Leert das Anzeigefeld, wenn nur ein Eintrag vorhanden war
    }
});

// Event-Listener für die Prozent-Taste
percent.addEventListener('click', function () {
    if (display.value !== '') {
        let entries = display.value.split(' '); // Teilt das Anzeigefeld in seine Einträge
        if (entries.length === 3) { // [8] [*] [8]
            operand = entries[0]; // Setzt den Operanden
            currentOperator = entries[1]; // Setzt den aktuellen Operator
            let secondOperand = entries[2]; // Setzt den zweiten Operanden

            secondOperand = parseFloat(secondOperand) / 100; // Teilt den zweiten Operanden durch 100

            display.value = `${operand} ${currentOperator} ${secondOperand}`; // Setzt das Anzeigefeld neu zusammen
        }
    }


    // ! Deprecated
    // if (display.value !== '') {
    //     console.log(display.value);
    //     display.value = parseFloat(display.value) / 100; // Teilt die Zahl im Anzeigefeld durch 100
    // }
});