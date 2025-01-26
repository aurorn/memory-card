import { useState } from 'react';
import { fetchPokemonData } from './API';

export function useGameLogic() {
  const [allCards, setAllCards] = useState([]);
  const [currentCards, setCurrentCards] = useState([]);
  const [clickedCards, setClickedCards] = useState(new Set());
  const [score, setScore] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);

  const startGame = async () => {
    setScore(0);
    setClickedCards(new Set());
    const pokemon = await fetchPokemonData(151);
    setAllCards(pokemon);
    startNewRound(pokemon, new Set());
    setIsGameStarted(true);
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
    
    const roundCards = [...otherCards, newCard];
    const shuffledCards = shuffleArray(roundCards);
    
    setCurrentCards(shuffledCards);
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const endGame = (isWin = false) => {
    const message = isWin 
      ? `Congratulations! You found all cards! Final score: ${score}`
      : `Game Over! You clicked a card twice. Final score: ${score}`;
    setAlertMessage(message);
    setShowAlert(true);
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
    handleCardClick,
    startGame,
    showAlert,
    alertMessage,
    isGameStarted,
    setShowAlert
  };
}