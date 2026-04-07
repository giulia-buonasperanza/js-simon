//Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
//Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce.
//Prima parte in cui un bottone genera 5 numeri generati casualmente, che rimarrano visibili per 30 secondi
//Seconda parte in cui l'utente potrà inseire i numeri che si ricorda per poi controllare se sono uguali 


//VARIABILI

let numbersToRemember = [];
let displayTimeout;


const startBtn = document.getElementById('start-btn');
const checkBtn = document.getElementById('check-btn');
const numbersDisplay = document.getElementById('numbers-display');
const inputs = document.querySelectorAll('.number-input');
const resultDiv = document.getElementById('result');


//FUNZIONI

//Funzione per iniziare il gioco
function startGame() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = ''; // svuota il campo
    }

    resultDiv.textContent = '';// svuota il contenuto del div risultato

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

        // Riattiva tutti gli input
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = false;
        }

        // Riattiva il bottone
        checkBtn.disabled = false;

        // Pulisce il risultato
        resultDiv.textContent = '';

    }, 30 * 1000);
    //Funzione per controllare i numeri inseriti

    function checkNumbers() {
        const userNumbers = [];
        const inputsArray = Array.from(inputs);

        for (let i = 0; i < inputsArray.length; i++) {
            userNumbers.push(parseInt(inputsArray[i].value));
        }
        // Controllo se sono stati inseriti tutti i numeri
        if (userNumbers.some(num => isNaN(num))) {
            resultDiv.textContent = 'Inserisci tutti i numeri!';
            resultDiv.style.color = 'red';
            return;
        }

        const correct = numbersToRemember.every(function (num, index) {
            return num === userNumbers[index];
        });
        if (correct) {
            resultDiv.textContent = 'Bravo! Hai ricordato tutti i numeri correttamente!';
        } else {
            resultDiv.textContent = `Sbagliato! I numeri erano: ${numbersToRemember.join(' ')}`;
        }

        // Disabilita il pulsante di spunta, abilita l'avvio per una nuova partita
        checkBtn.disabled = true;
        startBtn.disabled = false;
    }


