/* This will be the Intro screen, 1 difficulty at the start, easy, medium, hard later*/
import '../styles/Intro.css'
import PropTypes from 'prop-types';


export default function Intro({ onStart, isGameStarted }) {
  if (isGameStarted) return null;
  
  return (
    <div className="intro-screen">
      <h1>Pokemon Memory Game</h1>
      <p>Don&apos;t click the same pokemon twice!</p>
      <button className="start-btn" onClick={onStart}>
        Start Game
      </button>
    </div>
  );
}

Intro.propTypes = {
    onStart: PropTypes.func.isRequired,
    isGameStarted: PropTypes.bool.isRequired
};