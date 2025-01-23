/* This file will load the restart button and how to play icon */

import { useState } from 'react'
import '../styles/Icons.css'

export default function Icons() {
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="icons-container">
      <div className="icon-wrapper">
        {showRules && (
          <div className="rules-tooltip">
            Click on pokemon cards to score points.
            Don&apos;t click the same card twice!
          </div>
        )}
        <div 
          className="help-icon"
          onMouseEnter={() => setShowRules(true)}
          onMouseLeave={() => setShowRules(false)}
        >
          ?
        </div>
      </div>
    </div>
  );
}