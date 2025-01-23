import '../styles/Cards.css';
import PropTypes from 'prop-types';

export default function Cards({ cards, onCardClick }) {
  return (
    <div className="cards-grid">
      {cards.map((pokemon) => (
        <div
          key={pokemon.id}
          className="card"
          onClick={() => onCardClick(pokemon.id)}
        >
          <img src={pokemon.image} alt={pokemon.name} />
          <p>{pokemon.name}</p>
        </div>
      ))}
    </div>
  );
}

Cards.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    })
  ).isRequired,
  onCardClick: PropTypes.func.isRequired
};