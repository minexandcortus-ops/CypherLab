import React from 'react';

/**
 * Braille Visual Component
 */
export const BrailleDisplay = ({ text }) => {
  const brailleMap = {
    'A': [1], 'B': [1,2], 'C': [1,4], 'D': [1,4,5], 'E': [1,5], 'F': [1,2,4], 'G': [1,2,4,5], 'H': [1,2,5], 'I': [2,4], 'J': [2,4,5],
    'K': [1,3], 'L': [1,2,3], 'M': [1,3,4], 'N': [1,3,4,5], 'O': [1,3,5], 'P': [1,2,3,4], 'Q': [1,2,3,4,5], 'R': [1,2,3,5], 'S': [2,3,4], 'T': [2,3,4,5],
    'U': [1,3,6], 'V': [1,2,3,6], 'W': [2,4,5,6], 'X': [1,3,4,6], 'Y': [1,3,4,5,6], 'Z': [1,3,5,6]
  };

  const renderDot = (num, activeDots) => {
    const coords = {
      1: { cx: 10, cy: 10 }, 2: { cx: 10, cy: 20 }, 3: { cx: 10, cy: 30 },
      4: { cx: 20, cy: 10 }, 5: { cx: 20, cy: 20 }, 6: { cx: 20, cy: 30 }
    };
    const c = coords[num];
    return <circle key={num} cx={c.cx} cy={c.cy} r="3" fill={activeDots.includes(num) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="0.5" opacity={activeDots.includes(num) ? 1 : 0.1} />;
  };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {text.toUpperCase().split('').map((char, i) => (
        char === ' ' ? <div key={i} className="w-6" /> : (
          <svg key={i} width="30" height="40" className="text-current bg-black/5 rounded p-1">
            {[1,2,3,4,5,6].map(num => renderDot(num, brailleMap[char] || []))}
          </svg>
        )
      ))}
    </div>
  );
};

/**
 * Semaphore Visual Component
 * Simplified representation using two arms on a clock-face (8 positions)
 */
export const SemaphoreDisplay = ({ text, size = 50 }) => {
  const semaMap = {
    'A': [4, 5], 'B': [3, 5], 'C': [2, 5], 'D': [1, 5], 'E': [5, 8], 'F': [5, 7], 'G': [5, 6],
    'H': [3, 4], 'I': [2, 4], 'J': [1, 8], 'K': [1, 4], 'L': [4, 8], 'M': [4, 7], 'N': [4, 6],
    'O': [2, 3], 'P': [1, 3], 'Q': [3, 8], 'R': [3, 7], 'S': [3, 6], 'T': [1, 2], 'U': [2, 8],
    'V': [1, 6], 'W': [2, 7], 'X': [2, 6], 'Y': [1, 7], 'Z': [7, 8]
  };
  
  const center = size / 2;
  const armLength = (size / 2) * 0.8;

  const getArmLine = (pos) => {
    // 1: Top, 2: Top-Right, 3: Right, 4: Bottom-Right, 5: Bottom, 6: Bottom-Left, 7: Left, 8: Top-Left
    const angles = { 1: -90, 2: -45, 3: 0, 4: 45, 5: 90, 6: 135, 7: 180, 8: 225 };
    const angle = (angles[pos] * Math.PI) / 180;
    const x2 = center + armLength * Math.cos(angle);
    const y2 = center + armLength * Math.sin(angle);
    return <line x1={center} y1={center} x2={x2} y2={y2} stroke="currentColor" strokeWidth={size/12} strokeLinecap="round" />;
  };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {text.toUpperCase().split('').map((char, i) => (
        char === ' ' ? <div key={i} style={{ width: size }} /> : (
          <svg key={i} width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="text-current bg-black/5 rounded-full p-1 border border-current/10 overflow-visible">
            <circle cx={center} cy={center} r="1.5" fill="currentColor" />
            {semaMap[char] && semaMap[char].map(pos => <React.Fragment key={pos}>{getArmLine(pos)}</React.Fragment>)}
          </svg>
        )
      ))}
    </div>
  );
};
