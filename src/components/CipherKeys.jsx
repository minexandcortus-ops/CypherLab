import React from 'react';
import { PigpenDisplay } from './PigpenGrid'; // Reuse if possible or create static versions
import { BrailleDisplay, SemaphoreDisplay } from './VisualCiphers';

/**
 * Static Alphabet Reference
 */
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/**
 * Component to display all active keys
 */
export const CipherKeysContainer = ({ activeTypes, shifts, aValues, themeClass }) => {
  if (!activeTypes || activeTypes.length === 0) return null;

  // Filter unique types to show one key per cipher used
  const uniqueTypes = [...new Set(activeTypes)];

  return (
    <div className={`mt-12 pt-8 border-t-2 border-dashed border-current/20 w-full no-print-section ${themeClass}`}>
      <h4 className="text-center uppercase tracking-[0.3em] font-black text-xs mb-8 opacity-50">Clés de Déchiffrement</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {uniqueTypes.map(type => (
          <div key={type} className="flex flex-col gap-4 p-4 rounded-xl bg-current/5 border border-current/10">
            <div className="text-[10px] font-black uppercase tracking-widest opacity-40">{type} Reference</div>
            <CipherKeyRenderer 
              type={type} 
              shift={shifts[activeTypes.indexOf(type)]} 
              aValue={aValues[activeTypes.indexOf(type)]} 
              themeId={themeClass.includes('black') ? 'hacker' : themeClass.includes('e2d1b1') ? 'topsecret' : 'parchment'}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const CipherKeyRenderer = ({ type, shift, aValue, themeId }) => {
  // Use high contrast colors based on theme
  const codeColor = themeId === 'hacker' ? 'text-enigma-hacker' : themeId === 'topsecret' ? 'text-blue-900' : 'text-red-800';

  switch (type) {
    case 'caesar':
      const shifted = ALPHABET.map((_, i) => ALPHABET[(i + (shift || 0)) % 26]);
      return (
        <div className="flex flex-col gap-1 text-[10px] font-mono overflow-x-auto pb-2">
          <div className="flex gap-2 border-b border-current/10 pb-1">
            <span className="w-8 opacity-40">Plain:</span> {ALPHABET.join(' ')}
          </div>
          <div className={`flex gap-2 pt-1 font-bold ${codeColor}`}>
            <span className="w-8 opacity-40">Code:</span> {shifted.join(' ')}
          </div>
          <div className="mt-2 text-[9px] opacity-60">Décalage: +{shift} (A ➔ {shifted[0]})</div>
        </div>
      );

    case 'alphanum':
      return (
        <div className="flex flex-col gap-2 italic text-xs">
          <div className="flex justify-between border-b border-current/10 pb-2">
            <span>A = {aValue}</span>
            <span>B = {aValue + 1}</span>
            <span>C = {aValue + 2}</span>
            <span>...</span>
          </div>
          <p className="text-[9px] opacity-60">Chaque lettre correspond à sa position dans l'alphabet + {aValue - 1}.</p>
        </div>
      );

    case 'morse':
      const morseData = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
        'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
        'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..'
      };
      return (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-x-4 gap-y-1 text-[9px] font-mono">
          {Object.entries(morseData).map(([l, c]) => (
            <div key={l} className="flex justify-between items-center bg-current/5 px-2 py-0.5 rounded">
               <span className="font-bold">{l}</span>
               <span className="opacity-60">{c}</span>
            </div>
          ))}
        </div>
      );

    case 'pigpen':
      const renderMiniGrid = (chars, hasDots) => (
        <div className="relative w-24 h-24 border-2 border-current rounded-sm">
          <div className="absolute top-1/3 w-full h-0.5 bg-current/30" />
          <div className="absolute top-2/3 w-full h-0.5 bg-current/30" />
          <div className="absolute left-1/3 h-full w-0.5 bg-current/30" />
          <div className="absolute left-2/3 h-full w-0.5 bg-current/30" />
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 items-center text-center font-bold text-[10px]">
            {chars.split('').map((c, i) => (
              <span key={i} className="relative">
                {c}{hasDots && <span className="absolute -top-1 -right-1 w-1 h-1 bg-current rounded-full" />}
              </span>
            ))}
          </div>
        </div>
      );
      const renderMiniX = (chars, hasDots) => (
        <div className="relative w-24 h-24 border-2 border-current rounded-sm clip-path-x overflow-hidden">
          <svg className="absolute inset-0 w-full h-full text-current opacity-30" viewBox="0 0 100 100">
             <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="2" />
             <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="2" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-[10px]">
            <span className="absolute top-2">{chars[0]}{hasDots && '.'}</span>
            <span className="absolute right-2">{chars[1]}{hasDots && '.'}</span>
            <span className="absolute bottom-2">{chars[2]}{hasDots && '.'}</span>
            <span className="absolute left-2">{chars[3]}{hasDots && '.'}</span>
          </div>
        </div>
      );

      return (
        <div className="flex flex-col gap-4">
           <div className="flex flex-wrap gap-4 items-center justify-center py-2 bg-white/5 rounded-lg border border-current/5">
              {renderMiniGrid('ABCDEFGHI', false)}
              {renderMiniGrid('JKLMNOPQR', true)}
              {renderMiniX('STUV', false)}
              {renderMiniX('WXYZ', true)}
           </div>
           <p className="text-[8px] italic opacity-50 text-center">Les points indiquent la deuxième série de symboles.</p>
        </div>
      );

    case 'polybius':
      return (
        <div className="flex items-center gap-6">
          <table className="border-collapse border border-current/20 text-[10px] font-mono">
            <thead>
              <tr>
                <th className="border border-current/20 p-1 bg-current/10"></th>
                {[1,2,3,4,5].map(n => <th key={n} className="border border-current/20 p-1 bg-current/10">{n}</th>)}
              </tr>
            </thead>
            <tbody>
              {['ABCDE','FGHIK','LMNOP','QRSTU','VWXYZ'].map((row, i) => (
                <tr key={i}>
                  <th className="border border-current/20 p-1 bg-current/10">{i+1}</th>
                  {row.split('').map((char, j) => <td key={j} className="border border-current/20 p-2 text-center">{char}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[9px] opacity-60">I et J partagent la même case (24).</p>
        </div>
      );

    case 'braille':
      return (
        <div className="flex flex-col gap-2">
           <p className="text-[9px] opacity-60 italic">Utilisez l'alphabet Braille standard.</p>
           <div className="flex flex-wrap gap-2 opacity-60 scale-50 origin-top-left -mb-16">
              {'ABCDEFGHIJ'.split('').map(c => (
                <div key={c} className="flex flex-col items-center">
                   <BrailleDisplay text={c} />
                   <span className="text-4xl mt-2 font-black">{c}</span>
                </div>
              ))}
           </div>
        </div>
      );

    case 'semaphore':
      return (
        <div className="flex flex-col gap-2">
           <p className="text-[9px] opacity-60 italic">Signaux Sémaphore (positions des bras).</p>
           <div className="flex flex-wrap gap-2 opacity-60 scale-75 origin-top-left -mb-8">
              {'ABCDE'.split('').map(c => (
                <div key={c} className="flex flex-col items-center">
                   <SemaphoreDisplay text={c} />
                   <span className="text-xs mt-1 font-black">{c}</span>
                </div>
              ))}
              <span className="text-[10px] self-end ml-4 italic">...etc</span>
           </div>
        </div>
      );

    case 'mirror':
      return <p className="text-sm font-bold opacity-80 italic">Lisez ce texte en le plaçant devant un vrai miroir ! 🪞</p>;

    case 'binary':
      return (
        <div className="flex flex-col gap-1 text-[10px] font-mono">
          <div className="flex justify-between items-center opacity-70">
            <span>A: 01000001</span>
            <span>B: 01000010</span>
            <span>C: 01000011</span>
          </div>
          <p className="mt-2 text-[9px] opacity-60">Conversion ASCII Standard (8 bits).</p>
        </div>
      );

    default:
      return null;
  }
};
