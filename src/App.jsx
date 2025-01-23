
import { useGameLogic } from './components/Logic';
import Intro from './components/Intro';
import Cards from './components/Cards';
import Alerts from './components/Alerts';
import Icons from './components/Icons';
import './App.css'
import './styles/Alerts.css'

function App() {
  const { 
    score, 
    currentCards, 
    handleCardClick, 
    startGame,
    showAlert,
    alertMessage,
    isGameStarted,
    setShowAlert 
  } = useGameLogic();

  return (
    <div className="app">

      <Intro onStart={startGame} isGameStarted={isGameStarted} />
      <Icons />
      {isGameStarted && (
        <>
          <div className="score">Score: {score}</div>
          <Cards cards={currentCards} onCardClick={handleCardClick} />
        </>
      )}
      <Alerts 
        show={showAlert}
        message={alertMessage}
        onRestart={() => {
          setShowAlert(false);
          startGame();
        }}
      />
    </div>
  );
}

export default App;