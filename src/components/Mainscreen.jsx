/* This will be the component that will render after the Intro screen and have all of the other components loaded into it */

import PropTypes from 'prop-types';
import Cards from './Cards';
import Icons from './Icons';
import '../styles/Mainscreen.css';

export default function Mainscreen({ score, cards, onCardClick }) {
  return (
    <>
      <header className="header">
        <div className="score">
          <p className="score-text">Score: {score}</p>
        </div>
        <Icons />
      </header>
      
      <main className="cards-grid">
        <Cards cards={cards} onCardClick={onCardClick} />
      </main>
      
      <footer className="footer">
        <p>Memory Card Game</p>
      </footer>
    </>
  );
}

Mainscreen.propTypes = {
  score: PropTypes.number.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    })
  ).isRequired,
  onCardClick: PropTypes.func.isRequired
};