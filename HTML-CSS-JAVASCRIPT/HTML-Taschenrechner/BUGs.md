Flieskommazahl nicht limitiert ist

## Prozent-Rechnung funktioniert nicht wie erwartet

```js
NEU: if (display.value !== '') {
    let entries = display.value.split(' '); // Teilt das Anzeigefeld in seine Einträge
    if (entries.length === 3) {
        // [8] [*] [8]
        operand = entries[0]; // Setzt den Operanden
        currentOperator = entries[1]; // Setzt den aktuellen Operator
        let secondOperand = entries[2]; // Setzt den zweiten Operanden

        secondOperand = parseFloat(secondOperand) / 100; // Teilt den zweiten Operanden durch 100

        display.value = `${operand} ${currentOperator} ${secondOperand}`; // Setzt das Anzeigefeld neu zusammen
    }
}

ALT: if (display.value !== '') {
    console.log(display.value);
    display.value = parseFloat(display.value) / 100; // Teilt die Zahl im Anzeigefeld durch 100
}
```

## CE Bug - Formel konnte nicht berechnet werden, nach Betätigung der CE Taste

```js
FIX in Zeile 85
ALT:
      display.value = entries.join(' ');
NEU:
    display.value = entries.join(' ') + ' ';
```
