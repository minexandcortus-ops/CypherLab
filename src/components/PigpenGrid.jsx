import React from 'react';

/**
 * Pigpen Cipher Visual Component
 * Renders letters into their Pigpen equivalent SVG shapes.
 */
const PigpenShape = ({ char }) => {
  const letters = char.toUpperCase();
  
  // Mapping of letters to grid/shape types
  const map = {
    // 1st Grid (No Dots)
    'A': { type: 'top-left', dot: false },
    'B': { type: 'top', dot: false },
    'C': { type: 'top-right', dot: false },
    'D': { type: 'left', dot: false },
    'E': { type: 'center', dot: false },
    'F': { type: 'right', dot: false },
    'G': { type: 'bottom-left', dot: false },
    'H': { type: 'bottom', dot: false },
    'I': { type: 'bottom-right', dot: false },
    
    // 2nd Grid (With Dots)
    'J': { type: 'top-left', dot: true },
    'K': { type: 'top', dot: true },
    'L': { type: 'top-right', dot: true },
    'M': { type: 'left', dot: true },
    'N': { type: 'center', dot: true },
    'O': { type: 'right', dot: true },
    'P': { type: 'bottom-left', dot: true },
    'Q': { type: 'bottom', dot: true },
    'R': { type: 'bottom-right', dot: true },
    
    // X Grids
    'S': { type: 'x-top', dot: false },
    'T': { type: 'x-right', dot: false },
    'U': { type: 'x-bottom', dot: false },
    'V': { type: 'x-left', dot: false },
    'W': { type: 'x-top', dot: true },
    'X': { type: 'x-right', dot: true },
    'Y': { type: 'x-bottom', dot: true },
    'Z': { type: 'x-left', dot: true },
  };

  const config = map[letters];
  if (!config) return <span className="w-10 h-10 flex items-center justify-center">{char}</span>;

  const renderLines = () => {
    switch(config.type) {
      case 'top-left': return <><line x1="10" y1="10" x2="40" y2="10" stroke="currentColor" strokeWidth="3"/><line x1="10" y1="10" x2="10" y2="40" stroke="currentColor" strokeWidth="3"/></>;
      case 'top': return <><line x1="10" y1="10" x2="40" y2="10" stroke="currentColor" strokeWidth="3"/><line x1="10" y1="10" x2="10" y2="40" stroke="currentColor" strokeWidth="3"/><line x1="40" y1="10" x2="40" y2="40" stroke="currentColor" strokeWidth="3"/></>;
      case 'top-right': return <><line x1="10" y1="10" x2="40" y2="10" stroke="currentColor" strokeWidth="3"/><line x1="40" y1="10" x2="40" y2="40" stroke="currentColor" strokeWidth="3"/></>;
      case 'left': return <><line x1="10" y1="10" x2="10" y2="40" stroke="currentColor" strokeWidth="3"/><line x1="10" y1="10" x2="40" y2="10" stroke="currentColor" strokeWidth="3"/><line x1="10" y1="40" x2="40" y2="40" stroke="currentColor" strokeWidth="3"/></>;
      case 'center': return <rect x="10" y="10" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="3"/>;
      case 'right': return <><line x1="40" y1="10" x2="40" y2="40" stroke="currentColor" strokeWidth="3"/><line x1="10" y1="10" x2="40" y2="10" stroke="currentColor" strokeWidth="3"/><line x1="10" y1="40" x2="40" y2="40" stroke="currentColor" strokeWidth="3"/></>;
      case 'bottom-left': return <><line x1="10" y1="10" x2="10" y2="40" stroke="currentColor" strokeWidth="3"/><line x1="10" y1="40" x2="40" y2="40" stroke="currentColor" strokeWidth="3"/></>;
      case 'bottom': return <><line x1="10" y1="40" x2="40" y2="40" stroke="currentColor" strokeWidth="3"/><line x1="10" y1="10" x2="10" y2="40" stroke="currentColor" strokeWidth="3"/><line x1="40" y1="10" x2="40" y2="40" stroke="currentColor" strokeWidth="3"/></>;
      case 'bottom-right': return <><line x1="40" y1="10" x2="40" y2="40" stroke="currentColor" strokeWidth="3"/><line x1="10" y1="40" x2="40" y2="40" stroke="currentColor" strokeWidth="3"/></>;
      case 'x-top': return <path d="M10,10 L25,25 L40,10" fill="none" stroke="currentColor" strokeWidth="3"/>;
      case 'x-bottom': return <path d="M10,40 L25,25 L40,40" fill="none" stroke="currentColor" strokeWidth="3"/>;
      case 'x-left': return <path d="M10,10 L25,25 L10,40" fill="none" stroke="currentColor" strokeWidth="3"/>;
      case 'x-right': return <path d="M40,10 L25,25 L40,40" fill="none" stroke="currentColor" strokeWidth="3"/>;
      default: return null;
    }
  };

  return (
    <div className="inline-block m-1">
      <svg width="50" height="50" className="text-current">
        {renderLines()}
        {config.dot && <circle cx="25" cy="25" r="4" fill="currentColor" />}
      </svg>
    </div>
  );
};

export const PigpenDisplay = ({ text }) => {
  return (
    <div className="flex flex-wrap justify-center max-w-full">
      {text.split('').map((char, i) => (
        char === ' ' ? <div key={i} className="w-10 h-10" /> : <PigpenShape key={i} char={char} />
      ))}
    </div>
  );
};
