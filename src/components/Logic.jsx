/* The main game logic will be implemented here */

import { useState } from 'react'

const gameState = {
    score: 0,
    pickedCards: new Set(),
    currentRound: [],
    allCards: []
}

function startGame() {
    gameState.score = 0;
    gameState.pickedCards.clear();
    gameState.currentRound = [];
    startNewRound();
}

function startNewRound() {
    const newCard = getNewCard();
    const previousCards = getRandomPreviousCards(3);
    gameState.currentRound = shuffleArray([newCard, ...previousCards]);
    renderCards();
}

function handleCardClick(card) {
    if (gameState.clickedCards.has(card.id)) {
        endGame();
        return;
    }

    gameState.clickedCards.add(card.id);
    gameState.score++;
    startNewRound();
}

function getNewCard() {
    const unusedCards = gameState.allCards.filter(card => !gameState.pickedCards.has(card.id));
    if (unusedCards.length === 0) {
        endGame(true);
        return;
    }
    return unusedCards[Math.floor(Math.random() * unusedCards.length)];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderCards() {
    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = '';

    gameState.currentRound.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;

        //future card styling here

        cardElement.addEventListener('click', () => handleCardClick(card));
        cardContainer.appendChild(cardElement);
    });
}

function endGame(isWin = false) {
    if (isWin) {
      alert(`Congratulations! You found all cards! Final score: ${gameState.score}`);
    } else {
      alert(`Game Over! You clicked a card twice. Final score: ${gameState.score}`);
    }
    startGame();
  }