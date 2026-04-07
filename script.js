// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
// Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce.
// Prima parte in cui un bottone genera 5 numeri generati casualmente, che rimarranno visibili per 30 secondi.
// Seconda parte in cui l'utente potrà inserire i numeri che si ricorda per poi controllare se sono uguali.

// VARIABILI
let numbersToRemember = [];
let displayTimeout;

const startBtn = document.getElementById('start-btn');
const checkBtn = document.getElementById('check-btn');
const numbersDisplay = document.getElementById('numbers-display');
const inputs = document.querySelectorAll('input[type="number"]');
const resultDiv = document.getElementById('result');


//FUNZIONI

//Funzione per iniziare il gioco
function startGame() {

    resetGame();

    numbersToRemember = [];

    while (numbersToRemember.length < 5) {
        const num = Math.floor(Math.random() * 99) + 1;

         if (!numbersToRemember.includes(num)) {
        numbersToRemember.push(num);
        }
    }

    numbersDisplay.textContent = numbersToRemember.join(' ');
    numbersDisplay.classList.add('show');

    startBtn.disabled = true;

    displayTimeout = setTimeout(function () {

        numbersDisplay.classList.remove('show');
        numbersDisplay.textContent = '';

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = false;
        }

        checkBtn.disabled = false;

    }, 20*1000);
}


//Funzione per controllare i numeri inseriti
function checkNumbers() {

    const userNumbers = [];

    for (let i = 0; i < inputs.length; i++) {
        userNumbers.push(parseInt(inputs[i].value));
    }

    // Controllo input vuoti
    for (let i = 0; i < userNumbers.length; i++) {
        if (isNaN(userNumbers[i])) {
            resultDiv.textContent = 'Inserisci tutti i numeri!';
            return;
        }
    }

    // Array per segnare i numeri già trovati
    const used = [];

    let correctCount = 0;

    for (let i = 0; i < userNumbers.length; i++) {

        let found = false;

        for (let j = 0; j < numbersToRemember.length; j++) {

            // controllo numero + non già usato
            if (userNumbers[i] === numbersToRemember[j] && !used[j]) {
                found = true;
                used[j] = true; // segna come usato
                correctCount++;
                break;
            }
        }
    }

    if (correctCount === 5) {
        resultDiv.textContent = 'Perfetto! Tutti i numeri corretti!';
        resultDiv.style.color = 'green';
    } else {
        resultDiv.textContent =
            `Hai indovinato ${correctCount}/5. Numeri: ${numbersToRemember.join(' ')}`;
        resultDiv.style.color = 'red';
    }


    checkBtn.disabled = true;
    startBtn.disabled = false;
}



// Reset
function resetGame() {
    startBtn.disabled = false;
    checkBtn.disabled = true;

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
        inputs[i].value = '';
    }

    resultDiv.textContent = '';

    clearTimeout(displayTimeout);
}

//Eventi
startBtn.addEventListener('click', startGame);
checkBtn.addEventListener('click', checkNumbers);

//Stato iniziale
resetGame();