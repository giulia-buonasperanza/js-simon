//Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
//Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce.
//Prima parte in cui un bottone genera 5 numeri generati casualmente, che rimarrano visibili per 30 secondi
//Seconda parte in cui l'utente potrà inseire i numeri che si ricorda per poi controllare se sono uguali 


//VARIABILI

let numbersToRemember = [];

const startBtn = document.getElementById('start-btn');
const checkBtn = document.getElementById('check-btn');
const numbersDisplay = document.getElementById('numbers-display');
const inputs = document.querySelectorAll('.number-input');
const resultDiv = document.getElementById('result');


//FUNZIONI

//Funzione per iniziare il gioco
function startGame() {
    inputs.forEach(function (input) { // per ogni input nella lista
        input.value = ''; // svuota il campo
    });

    resultDiv.textContent = ''; // svuota il contenuto del div risultato

    //Genera 5 numeri casuali (1-99)
    numbersToRemember = [];
    const usedNumbers = new Set();
    while (numbersToRemember.length < 5) {
        const num = Math.floor(Math.random() * 99) + 1;
        if (!usedNumbers.has(num)) {
            usedNumbers.add(num);
            numbersToRemember.push(num);
        }
    }

    startBtn.addEventListener('click', startGame);

    //Numeri da memorizzare
    numbersDisplay.textContent = numbersToRemember.join(' ');
    numbersDisplay.classList.add('show');

    startBtn.disabled = true;

    //Nascondere i numeri dopo 30 secondi
    displayTimeout = setTimeout(function () {
        numbersDisplay.classList.remove('show');
        numbersDisplay.textContent = '';

        inputs.forEach(function (input) {
            checkBtn.disabled = false;
        });

        checkBtn.disabled = false;
        resultDiv.textContent = '';
    }, 30 * 1000);
}

//Funzione per controllare i numeri inseriti