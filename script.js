// 'use strict';

//VERSION 4

//buttns element
const btnRollElm = document.querySelector('.btn--roll');
const btnHoldElm = document.querySelector('.btn--hold');
const btnNewElm = document.querySelector('.btn--new');
const diceElm = document.querySelector('.dice');

//Active Player
let player, current, score, playing;

function init() {
  //initialisation
  player = 0;
  current = 0;
  score = [0, 0];
  playing = true;

  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`#current--1`).textContent = 0;
  document.querySelector(`#current--0`).textContent = 0;
  document.querySelector(`#score--0`).textContent = 0;
  document.querySelector(`#score--1`).textContent = 0;
  diceElm.classList.add('hidden');
}

function changePlayer() {
  //changes and displays the active player
  document
    .querySelector(`.player--${player}`)
    .classList.remove('player--active');
  player = player === 0 ? 1 : 0;
  document.querySelector(`.player--${player}`).classList.add('player--active');
}

function resetCurrent() {
  //reset and display current
  current = 0;
  document.querySelector(`#current--${player}`).textContent = 0;
}

init();

//ROLL DICE BTN
btnRollElm.addEventListener('click', function () {
  if (playing) {
    //Dice logic
    diceElm.classList.remove('hidden');
    const dice = Math.floor(Math.random() * 6) + 1;
    diceElm.src = `dice-${dice}.png`;
    //Add dice to curren if not 1
    if (dice !== 1) {
      current += dice;
      document.querySelector(`#current--${player}`).textContent = current;
      // Reset current and change player if 1
    } else {
      resetCurrent();
      changePlayer();
    }
  }
});

//HOLD BTN
btnHoldElm.addEventListener('click', function () {
  if (playing) {
    //add current to score
    score[player] += current;
    document.querySelector(`#score--${player}`).textContent = score[player];
    resetCurrent();
    //check if win
    if (score[player] >= 100) {
      document.querySelector(`#score--${player}`).textContent = 'WINS!';
      document
        .querySelector(`.player--${player}`)
        .classList.add('player--winner');
      diceElm.classList.add('hidden');
      playing = false;
    } else {
      changePlayer();
    }
  }
});

//NEW GAME BTN
btnNewElm.addEventListener('click', init);
