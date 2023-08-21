// Referenzen auf die benötigten HTML-Elemente erhalten
const form = document.getElementById('grocery') as HTMLFormElement;
const input = document.getElementById('writeList') as HTMLInputElement;
const list = document.querySelector('.list_items') as HTMLOListElement;

// Event-Listener zum Formular hinzufügen
form.addEventListener('submit', addItem);

function addItem(event: Event): void {
    const listItem: HTMLElement = document.createElement('li');
    const paragraph: HTMLElement = document.createElement('p');

    event.preventDefault();

    list.appendChild(listItem);
    listItem.appendChild(paragraph);

    paragraph.innerText = input.value;

    input.value = '';

    addCrudIcons(paragraph);
}

interface CrudItem {
    action: () => void;
    icon: string;
}

// Funktion zum Hinzufügen von Edit, Delete, Done Buttons
function addCrudIcons(parent: HTMLElement): void {
    const items: CrudItem[] = [
        { action: done, icon: 'fa-solid fa-check' },
        { action: editListItem, icon: 'fa-regular fa-pen-to-square' },
        { action: deleteListItem, icon: 'fa-solid fa-trash' },
    ];

    const spanElement: HTMLElement = document.createElement('span');
    spanElement.classList.add('crud');

    items.forEach((item) => {
        const iElement: HTMLElement = document.createElement('i');
        iElement.classList.add(...item.icon.split(' '));

        iElement.addEventListener('click', (event) => item.action(event));

        spanElement.appendChild(iElement);
    });

    parent.appendChild(spanElement);
}

// Funktion zum Editieren eines Listenelements
function editListItem(event: Event): void {
    const target = event.target as HTMLElement;
    const listItem = target.closest('p') as HTMLElement;

    if (listItem) {
        const inputElement: HTMLInputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.value = listItem.innerText;

        listItem.innerText = '';
        listItem.appendChild(inputElement);

        inputElement.focus();

        inputElement.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                listItem.innerText = inputElement.value;

                const paragraph: HTMLElement = listItem.closest(
                    'p'
                ) as HTMLElement;
                addCrudIcons(paragraph);
            }
        });
    }

    console.log(`EDIT: ${listItem}`);
}

// Funktion zum Löschen eines Listenelements
function deleteListItem(event: Event): void {
    const target = event.target as HTMLElement;
    const listItem = target.closest('li') as HTMLElement;

    if (listItem) {
        listItem.remove();
    }
    console.log(`DELETE: ${this.target}`);
}

// Funktion zum Markieren eines Elements als erledigt
function done(event: Event): void {
    const target = event.target as HTMLElement;
    const listItem = target.closest('p') as HTMLElement;

    if (listItem) {
        listItem.classList.toggle('done');
    }
}

// Funktion zum Leeren der gesamten Liste
