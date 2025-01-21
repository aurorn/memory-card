import { useGameLogic } from './Logic';
import '../styles/Cards.css';

export default function Cards() {
    const { score, currentCards, handleCardClick } = useGameLogic();
  

  return (
    <div className="cards-container">
      <div className="score">Score: {score}</div>
      <div className="cards-grid">
        {currentCards.map((pokemon) => (
          <div
            key={pokemon.id}
            className="card"
            onClick={() => handleCardClick(pokemon.id)}
          >
            <img src={pokemon.image} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}