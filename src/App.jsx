import { useGameLogic } from './components/Logic';
import Intro from './components/Intro';
import Mainscreen from './components/Mainscreen';
import Alerts from './components/Alerts';
import './App.css';
import './styles/Alerts.css';
import image from './assets/background.png';

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
    <div className="app" style={{ backgroundImage: `url(${image})` }}>
      <Intro onStart={startGame} isGameStarted={isGameStarted} />
      {isGameStarted && (
        <Mainscreen 
          score={score}
          cards={currentCards}
          onCardClick={handleCardClick}
        />
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