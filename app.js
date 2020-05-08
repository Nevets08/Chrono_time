const buttonStart = document.getElementById('start');
const buttonLap = document.getElementById('lap');
const selectorMs = document.getElementById('ms');
const selectorSec = document.getElementById('sec');
const selectorMin = document.getElementById('min');
let interval;
let timerMs = 0;
let timerSec = 0;
let timerMin = 0;

/* ATTENTION au 100 ms qui font buguer l'affichage -> a corriger */
// Bouton start/stop
buttonStart.addEventListener('click', () => {

    /*
        --------- Traitement des boutons ---------
    */
    buttonStart.classList.toggle('btn-color');
    buttonStart.classList.toggle('red');

    if (buttonStart.innerHTML === 'start') {
        buttonStart.innerHTML = 'stop';
        buttonLap.innerHTML = 'lap';
        // Demarre le timer
        intervalStart();
        timer();

    } else if (buttonStart.innerHTML === 'stop') {
        buttonStart.innerHTML = 'start';
        buttonLap.innerHTML = 'reset';
        // Pause timer
        intervalPause();
    };

});

// button reset/lap
let lapCount = 0;
buttonLap.addEventListener('click', () => {
    
    // Ne pas créer de balises si le timer n'est pas enclenché
    if (timerMs === 00 && timerSec === 00 && timerMin === 00) {
        return;
    };

    // Crée une balise avec la valeur du temps
    if (buttonLap.innerHTML === 'lap') {     
        lapCount += 1;

        const createLapDiv = document.createElement('div');
        createLapDiv.setAttribute('class', 'col-xl-11 col-sm-12 lapResult');
        const createLapContent = document.createTextNode('Lap ' + lapCount + ' ' + selectorMin.innerHTML + ':' + selectorSec.innerHTML + ':' + selectorMs.innerHTML);
        createLapDiv.appendChild(createLapContent);
        document.getElementById('lapContainer').appendChild(createLapDiv);
    };

    if (buttonLap.innerHTML === 'reset') {
        intervalReset();
        resetLaps();
    };
});

/*
    --------- Traitement du temps ---------
    Quand les ms = 100 -> sec +1 && ms = 0
    Quand les sec = 60 -> min +1 && sec = 0
*/
function timer() {
    timerMs += 1;
    selectorMs.innerHTML = timerMs;
    // Afficher le zero quand ms < 10
    if (timerMs < 9) {
        selectorMs.innerHTML = '0' + timerMs;
    };

    if (timerSec > 9) {
        selectorSec.innerHTML = timerSec;
    };
    // Gere les ms qui incremente les secondes quand ms === 100
    if (timerMs === 100) {
        timerMs = 0;
        timerSec += 1;
        // Enlever le zero quand secondes > 10
        selectorSec.innerHTML = '0' + timerSec;
    };
    // Gere les secondes qui incremente les min quand sec === 60
    if (timerSec === 60) {
        timerSec = 0;
        timerMin += 1;
        // Afficher le zero quand minutes > 60
        selectorMin.innerHTML = '0' + timerMin;
        // Supprime le zero quand minutes > 60
        if (timerMin > 9) {
            selectorMin.innerHTML = timerMin;
        };
    };
};

// Demarre le timer
function intervalStart() {
    interval = setInterval(() => {
        timer();
    }, 10);
};

// Timer pause
function intervalPause() {
    clearInterval(interval);
};

// Reset timer
function intervalReset() {
    selectorMin.innerHTML = '00';
    selectorSec.innerHTML = '00';
    selectorMs.innerHTML = '00';
    timerMin = 0;
    timerSec = 0;
    timerMs = 0;
};

// Reset laps
function resetLaps() {
    lapCount = 0;
    
    const lapResult = document.querySelectorAll('#lapContainer .lapResult');
    for (let i = 0; i < lapResult.length; i++) {
        lapResult[i].remove();
    };
};