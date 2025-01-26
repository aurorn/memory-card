import '../styles/Cards.css';
import PropTypes from 'prop-types';

export default function Cards({ cards, onCardClick }) {
  const handleMouseMove = (e, cardElement) => {
    const rect = cardElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = -((y - centerY) / centerY) * 15;

    cardElement.style.transform = 
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

    const glare = cardElement.querySelector('.card-glare');
    if (glare) {
      const glareX = ((x / rect.width) * 100);
      const glareY = ((y / rect.height) * 100);
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`;
    }
  };

  const handleMouseLeave = (cardElement) => {
    cardElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  };

  return (
    <div className="cards-grid">
      {cards.map((pokemon) => (
        <div
        key={pokemon.id}
        className="card"
        style={{ background: pokemon.typeColor }}
        onClick={() => onCardClick(pokemon.id)}
        onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
      >
        <div className="card-glare"></div>
        <div className="name-plate">
          <p>{pokemon.name}</p>
        </div>
        <img src={pokemon.image} alt={pokemon.name} />
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
      image: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      typeColor: PropTypes.string.isRequired
    })
  ).isRequired,
  onCardClick: PropTypes.func.isRequired
};