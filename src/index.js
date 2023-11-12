import setupGame from './game-setup';
import './style.css';

console.log("-----Start-----");

// DOM Elements
const overlay = document.querySelector('.overlay');
const shipSetupDiv = document.querySelector('.ship-setup');
const closeBtn = document.querySelector('.delete');

const newGame = document.querySelector('.new-game-btn');

newGame.addEventListener('click', setupGame);

closeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    shipSetupDiv.classList.add('hidden');
});

console.log("------End------");
