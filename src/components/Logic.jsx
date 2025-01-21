import { useState, useEffect } from 'react';
import { fetchPokemonData } from './API';

export function useGameLogic() {
  const [allCards, setAllCards] = useState([]);
  const [currentCards, setCurrentCards] = useState([]);
  const [clickedCards, setClickedCards] = useState(new Set());
  const [score, setScore] = useState(0);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = async () => {
    setScore(0);
    setClickedCards(new Set());
    const pokemon = await fetchPokemonData(151);
    setAllCards(pokemon);
    startNewRound(pokemon, new Set());
  };

  const startNewRound = (cards, clicked) => {
    const unclickedCards = cards.filter(card => !clicked.has(card.id));
    
    if (unclickedCards.length === 0) {
      endGame(true);
      return;
    }

    const newCard = getRandomCards(unclickedCards, 1)[0];
    const otherCards = getRandomCards(
      cards.filter(card => card.id !== newCard.id),
      3
    );
    
    setCurrentCards([newCard, ...otherCards]);
  };

  const endGame = (isWin = false) => {
    const alertOverlay = document.createElement('div');
    alertOverlay.className = 'alert-overlay active';
    
    const alertBox = document.createElement('div');
    alertBox.className = 'alert-box';
    
    const message = document.createElement('div');
    message.className = 'alert-title';
    message.textContent = isWin 
      ? `Congratulations! You found all cards! Final score: ${score}`
      : `Game Over! You clicked a card twice. Final score: ${score}`;
    
    const restartBtn = document.createElement('button');
    restartBtn.className = 'restart-btn';
    restartBtn.textContent = 'Play Again';
    restartBtn.onclick = () => {
      document.body.removeChild(alertOverlay);
      startGame();
    };
    
    alertBox.appendChild(message);
    alertBox.appendChild(restartBtn);
    alertOverlay.appendChild(alertBox);
    document.body.appendChild(alertOverlay);
  };

  const getRandomCards = (cards, count) => {
    const available = [...cards];
    const selected = [];
    
    while (selected.length < count && available.length > 0) {
      const randomIndex = Math.floor(Math.random() * available.length);
      const [card] = available.splice(randomIndex, 1);
      selected.push(card);
    }
    
    return selected;
  };

  const handleCardClick = (pokemonId) => {
    if (clickedCards.has(pokemonId)) {
      endGame(false);
      return;
    }

    const newClicked = new Set(clickedCards);
    newClicked.add(pokemonId);
    setClickedCards(newClicked);
    setScore(score + 1);
    
    startNewRound(allCards, newClicked);
  };

  return {
    score,
    currentCards,
    handleCardClick
  };
}