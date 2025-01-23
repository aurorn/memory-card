import PropTypes from 'prop-types';

export default function Alerts({ show, message, onRestart }) {
  if (!show) return null;

  return (
    <div className="alert-overlay active">
      <div className="alert-box">
        <div className="alert-title">{message}</div>
        <button className="restart-btn" onClick={onRestart}>
          Play Again
        </button>
      </div>
    </div>
  );
}

Alerts.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onRestart: PropTypes.func.isRequired
};