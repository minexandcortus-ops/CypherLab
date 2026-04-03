import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Sparkles, Wand2, Hash, Terminal, Eye, FileDigit, 
  Cpu, Info, Printer, RefreshCw, Grid3X3, Binary, 
  CircleDot, Flag, Scroll, Zap, Languages 
} from 'lucide-react';
import { ciphers } from './utils/ciphers';
import { ThemePreview } from './components/ThemePreview';

const App = () => {
  const [inputTexts, setInputTexts] = useState(['LE TRESOR EST SOUS LE CHENE', '', '', '']);
  const [cipherTypes, setCipherTypes] = useState(['caesar', 'caesar', 'caesar', 'caesar']);
  const [shifts, setShifts] = useState([3, 3, 3, 3]);
  const [aValues, setAValues] = useState([1, 1, 1, 1]);
  const [theme, setTheme] = useState('parchment');
  const [printCount, setPrintCount] = useState(1);
  const [cipheredTexts, setCipheredTexts] = useState(['', '', '', '']);

  useEffect(() => {
    const results = inputTexts.map((text, idx) => {
      if (!text && idx >= printCount) return '';
      const type = cipherTypes[idx];
      const s = shifts[idx];
      const a = aValues[idx];
      
      switch (type) {
        case 'caesar': return ciphers.caesar(text, s);
        case 'alphanum': return ciphers.alphanum(text, a);
        case 'morse': return ciphers.morse(text);
        case 'polybius': return ciphers.polybius(text);
        case 'binary': return ciphers.binary(text);
        case 'mirror': return ciphers.mirror(text);
        case 'pigpen':
        case 'braille':
        case 'semaphore':
        case 'pigpen':
        case 'braille':
        case 'semaphore':
          return text.toUpperCase();
        default:
          return text;
      }
    });
    setCipheredTexts(results);
  }, [inputTexts, cipherTypes, shifts, aValues, printCount]);

  const handleInputChange = (index, value) => {
    const newInputs = [...inputTexts];
    newInputs[index] = value;
    setInputTexts(newInputs);
  };

  const updateCipherType = (index, type) => {
    const newTypes = [...cipherTypes];
    newTypes[index] = type;
    setCipherTypes(newTypes);
  };

  const updateShift = (index, val) => {
    const newShifts = [...shifts];
    newShifts[index] = val;
    setShifts(newShifts);
  };

  const updateAValue = (index, val) => {
    const newAValues = [...aValues];
    newAValues[index] = val;
    setAValues(newAValues);
  };

  return (
    <div className="min-h-screen w-full bg-enigma-dark text-white font-sans selection:bg-enigma-accent selection:text-enigma-dark">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-enigma-accent p-2 rounded-lg rotate-12 neon-glow">
            <Lock className="text-enigma-dark" size={24} />
          </div>
          <h1 className="text-2xl font-mystery tracking-tighter text-enigma-accent">
            Cypher<span className="text-white">Lab</span>
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium opacity-60">
          <a href="#" className="hover:text-enigma-accent transition-colors">Galerie</a>
          <a href="#" className="hover:text-enigma-accent transition-colors">Tutoriels</a>
          <div className="h-4 w-[1px] bg-white/20" />
          <button className="flex items-center gap-2 hover:text-enigma-accent transition-colors">
            <Info size={16} /> Aide
          </button>
        </div>
      </header>

      <main className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Input & Controls */}
          <section className="flex flex-col gap-8">
            
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-enigma-accent">
                  <Wand2 size={20} />
                  <h2 className="font-mystery uppercase tracking-widest text-sm">Saisie des Messages</h2>
                </div>
                
                {/* Compact Layout Selection */}
                <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                  <span className="text-[10px] uppercase opacity-40 px-2 font-bold hidden md:block">Nombre :</span>
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => setPrintCount(num)}
                      className={`w-8 h-8 rounded-lg font-bold transition-all text-sm ${
                        printCount === num 
                        ? 'bg-enigma-accent text-enigma-dark' 
                        : 'hover:bg-white/10 text-white/40'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-6">
                {Array.from({ length: printCount }).map((_, idx) => (
                  <div key={idx} className="flex flex-col gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 transition-all focus-within:border-enigma-accent/30 focus-within:bg-white/[0.07]">
                    <div className="flex flex-wrap justify-between items-center gap-2 px-1">
                      <label className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Message #{idx + 1}</label>
                      
                      {/* Integrated Cipher Selector - All on one line */}
                      <div className="flex bg-black/40 p-1 rounded-lg gap-0.5 overflow-x-auto no-scrollbar">
                        {[
                          { id: 'caesar', icon: Sparkles, label: 'César' },
                          { id: 'alphanum', icon: Hash, label: 'A=X' },
                          { id: 'polybius', icon: Grid3X3, label: 'Polybe' },
                          { id: 'mirror', icon: RefreshCw, label: 'Miroir' },
                          { id: 'morse', icon: Terminal, label: 'Morse' },
                          { id: 'binary', icon: Binary, label: 'Binaire' },
                          { id: 'pigpen', icon: FileDigit, label: 'Pigpen' },
                          { id: 'braille', icon: CircleDot, label: 'Braille' },
                          { id: 'semaphore', icon: Flag, label: 'Sémaphore' },
                        ].map((m) => (
                          <button
                            key={m.id}
                            title={m.label}
                            onClick={() => updateCipherType(idx, m.id)}
                            className={`p-1.5 rounded-md transition-all flex-shrink-0 ${
                              cipherTypes[idx] === m.id 
                              ? 'bg-enigma-accent text-enigma-dark shadow-[0_0_10px_rgba(255,215,0,0.3)]' 
                              : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                            }`}
                          >
                            <m.icon size={13} />
                          </button>
                        ))}
                      </div>
                    </div>


                    <textarea
                      value={inputTexts[idx]}
                      onChange={(e) => handleInputChange(idx, e.target.value)}
                      className="w-full h-24 bg-transparent p-0 border-none text-lg font-medium focus:outline-none transition-all placeholder:opacity-30 resize-none"
                      placeholder={`Tapez le message #${idx + 1} ici...`}
                    />

                    {/* Contextual Sliders */}
                    <AnimatePresence mode="wait">
                      {cipherTypes[idx] === 'caesar' && (
                        <motion.div
                          key="caesar-slider"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-2 border-t border-white/5 flex flex-col gap-2"
                        >
                          <div className="flex justify-between text-[10px] uppercase font-bold opacity-30">
                            <span>Décalage César</span>
                            <span>A={String.fromCharCode(65 + (shifts[idx] % 26))} (Shift {shifts[idx]})</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="25"
                            value={shifts[idx]}
                            onChange={(e) => updateShift(idx, parseInt(e.target.value))}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-enigma-accent"
                          />
                        </motion.div>
                      )}
                      {cipherTypes[idx] === 'alphanum' && (
                        <motion.div
                          key="alphanum-slider"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-2 border-t border-white/5 flex flex-col gap-2"
                        >
                          <div className="flex justify-between text-[10px] uppercase font-bold opacity-30">
                            <span>Valeur Code A=X</span>
                            <span>A = {aValues[idx]}</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="50"
                            value={aValues[idx]}
                            onChange={(e) => updateAValue(idx, parseInt(e.target.value))}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-enigma-accent"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Theme Selection */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-enigma-accent">
                <Eye size={20} />
                <h2 className="font-mystery uppercase tracking-widest text-sm">Style Visuel (Thème Global)</h2>
              </div>
              <div className="flex gap-4">
                {[
                  { id: 'parchment', name: '📜', label: 'Parchemin' },
                  { id: 'hacker', name: '💻', label: 'Hacker' },
                  { id: 'topsecret', name: '📁', label: 'Top Secret' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`flex-1 p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                      theme === t.id 
                      ? 'bg-white/20 border-white gold-glow scale-105' 
                      : 'bg-white/5 border-white/10 opacity-40 hover:opacity-100'
                    }`}
                  >
                    <span className="text-3xl">{t.name}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Right Column: Preview */}
          <section className="flex flex-col items-center">
             <ThemePreview 
               cipheredTexts={cipheredTexts.slice(0, printCount)} 
               cipherTypes={cipherTypes.slice(0, printCount)} 
               shifts={shifts.slice(0, printCount)}
               aValues={aValues.slice(0, printCount)}
               themeId={theme} 
               printCount={printCount} 
             />
             
             <div className="mt-12 p-6 glass rounded-2xl border border-enigma-accent/20 max-w-md">
                <p className="text-sm text-center opacity-70 italic">
                  "Vous pouvez maintenant combiner différents codes sur la même page pour varier les plaisirs de vos joueurs !"
                </p>
             </div>
          </section>
        </div>

      </main>

      {/* Footer */}
      <footer className="py-10 text-center text-xs opacity-20 font-hacker">
        © 2026 CYPHERLAB - BUILT FOR CREATORS & MYSTERY LOVERS
      </footer>
    </div>
  );
};

export default App;
