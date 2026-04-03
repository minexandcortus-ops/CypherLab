import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import { Download, Printer } from 'lucide-react';
import { motion } from 'framer-motion';
import { PigpenDisplay } from './PigpenGrid';
import { BrailleDisplay, SemaphoreDisplay } from './VisualCiphers';
import { CipherKeysContainer } from './CipherKeys';

const themes = {
  parchment: {
    name: 'Vieux Parchemin',
    containerClass: 'bg-[#f4e4bc] text-[#5d4037] border-8 border-[#d4c49c] shadow-2xl p-12 relative overflow-hidden',
    fontClass: 'font-medieval',
    bgOverlay: 'opacity-20 pointer-events-none absolute inset-0 bg-[url("https://www.transparenttextures.com/patterns/old-map.png")]',
    header: '🏰 Message Secret',
  },
  hacker: {
    name: 'Hacker Terminal',
    containerClass: 'bg-black text-enigma-hacker border-2 border-enigma-hacker shadow-[0_0_20px_rgba(0,255,65,0.4)] p-12 font-hacker relative',
    fontClass: 'font-hacker',
    bgOverlay: 'opacity-10 pointer-events-none absolute inset-0 bg-[url("https://www.transparenttextures.com/patterns/carbon-fibre.png")]',
    header: '> _SYSTEM_DECRYPTED_:',
  },
  topsecret: {
    name: 'Top Secret',
    containerClass: 'bg-[#e2d1b1] text-red-900 border-4 border-dashed border-red-800 p-12 relative',
    fontClass: 'font-mystery font-bold',
    bgOverlay: 'opacity-10 pointer-events-none absolute inset-0 bg-[url("https://www.transparenttextures.com/patterns/paper-fibers.png")]',
    header: 'CONFIDENTIAL - TOP SECRET',
    stamp: 'CLASSIFIED',
  }
};

export const ThemePreview = ({ 
  cipheredTexts, 
  cipherTypes, 
  shifts,
  aValues,
  themeId, 
  printCount = 1 
}) => {
  const previewRef = useRef(null);
  const theme = themes[themeId] || themes.parchment;

  const handleDownload = async () => {
    if (previewRef.current === null) return;
    try {
      const dataUrl = await toPng(previewRef.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = `cypherlab-${themeId}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const CardContent = ({ text, type }) => (
    <>
      <div className={theme.bgOverlay} />
      
      {theme.stamp && (
         <div className="absolute top-4 right-4 border-4 border-red-800 text-red-800 px-4 py-1 rotate-12 font-black opacity-40 text-2xl uppercase stamp-element">
            {theme.stamp}
         </div>
      )}

      <div className="mb-4 opacity-60 tracking-tighter text-[10px] header-element">
        {theme.header}
      </div>

      <div className={`${theme.fontClass} text-xl md:text-2xl leading-relaxed z-10 break-words w-full content-element`}>
        {type === 'pigpen' ? (
          <PigpenDisplay text={text} />
        ) : type === 'braille' ? (
          <BrailleDisplay text={text} />
        ) : type === 'semaphore' ? (
          <SemaphoreDisplay text={text} />
        ) : type === 'mirror' ? (
          <span className="mirror-effect whitespace-pre-wrap inline-block w-full">{text}</span>
        ) : (
          <p className="whitespace-pre-wrap">{text}</p>
        )}
      </div>

      <div className="mt-12 text-xs opacity-30 italic footer-element">
        Généré par CypherLab - Prototype Alpha
      </div>
    </>
  );

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto font-sans">
      <div className="w-full flex justify-between items-center mb-2 no-print">
        <h3 className="text-enigma-accent font-mystery uppercase tracking-widest text-sm">Rendu Final</h3>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-4 py-2 rounded-full font-bold hover:bg-white/20 transition-all shadow-lg"
          >
            <Printer size={18} /> Imprimer
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-enigma-accent text-enigma-dark px-4 py-2 rounded-full font-bold hover:scale-105 transition-transform gold-glow shadow-lg"
          >
            <Download size={18} /> PNG
          </button>
        </div>
      </div>

      {/* Actual Printable Area */}
      <motion.div
        key={`${themeId}-${printCount}`}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        ref={previewRef}
        id="printable-area"
        className="w-full"
      >
        <div className={`grid-layout-${printCount} gap-4 md:gap-6 printable-cards-container`}>
          {cipheredTexts.map((text, i) => (
            <div 
              key={i} 
              className={`${theme.containerClass} enigma-card flex flex-col items-center justify-center text-center shadow-xl p-8 relative`}
            >
              <CardContent text={text} type={cipherTypes[i]} />
            </div>
          ))}
        </div>

        {/* Dynamic Keys Section - Force page break if necessary */}
        <div className="print-keys-section">
          <CipherKeysContainer 
            activeTypes={cipherTypes} 
            shifts={shifts} 
            aValues={aValues} 
            themeClass={theme.containerClass} 
          />
        </div>
      </motion.div>

      <div className="mt-8 no-print p-4 bg-white/5 border border-white/10 rounded-xl text-xs opacity-50 text-center max-w-md">
        <p>L'aperçu ci-dessus reflète la disposition finale sur la page imprimée. Les clés de déchiffrement sont ajoutées automatiquement.</p>
      </div>
    </div>
  );
};
