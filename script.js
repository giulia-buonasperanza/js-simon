//Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
//Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce.
//Prima parte in cui un bottone genera 5 numeri generati casualmente, che rimarrano visibili per 30 secondi
//Seconda parte in cui l'utente potrà inseire i numeri che si ricorda per poi controllare se sono uguali 


//VARIABILI

const startBtn = document.getElementById('start-btn');
const checkBtn = document.getElementById('check-btn');
const numbersDisplay = document.getElementById('numbers-display');
const inputs = document.querySelectorAll('.number-input');
const resultDiv = document.getElementById('result');


//FUNZIONI

//Funzione per iniziare il gioco

//Funzione per controllare i numeri inseriti