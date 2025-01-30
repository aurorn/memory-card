/* This will be the Intro screen, 1 difficulty at the start, easy, medium, hard later*/
import '../styles/Intro.css'
import "nes.css/css/nes.min.css";
import PropTypes from 'prop-types';


export default function Intro({ onStart, isGameStarted }) {
  if (isGameStarted) return null;
  
  return (
    <div className="intro-screen">
      <div className="nes-container with-title is-centered intro-container">
        <h1 className="title">Pokemon Memory Game</h1>
        <p className="nes-text ">Don&apos;t click the same pokemon twice!</p>
      </div>
      <button className="start-btn nes-btn" onClick={onStart}>
        Start Game
      </button>
    </div>
  );
}

Intro.propTypes = {
    onStart: PropTypes.func.isRequired,
    isGameStarted: PropTypes.bool.isRequired
};