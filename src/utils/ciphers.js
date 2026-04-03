/**
 * CypherLab Cipher Utilities
 */

// Morse Code Mapping
const MORSE_CODE = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
  '9': '----.', '0': '-----', ' ': '/'
};

/**
 * Caesar Cipher
 * @param {string} text 
 * @param {number} shift 
 */
export const caesarCipher = (text, shift) => {
  return text.toUpperCase().replace(/[A-Z]/g, (char) => {
    const code = char.charCodeAt(0);
    return String.fromCharCode(((code - 65 + shift) % 26) + 65);
  });
};

/**
 * Code A=X (Numeric Substitution)
 * @param {string} text 
 * @param {number} aValue 
 */
export const alphanumCipher = (text, aValue) => {
  return text.toUpperCase().split('').map(char => {
    if (/[A-Z]/.test(char)) {
      const position = char.charCodeAt(0) - 65; // A=0, B=1...
      return (position + aValue).toString();
    }
    return char;
  }).join('-').replace(/-?([^0-9A-Z])-?/g, '$1'); // Clean up dashes around non-alphanumeric chars
};

/**
 * Morse Code
 * @param {string} text 
 */
export const morseCode = (text) => {
  return text.toUpperCase().split('').map(char => MORSE_CODE[char] || char).join(' ');
};

/**
 * Pigpen Cipher (Parc à cochons) - Returns mapping for SVG/Font
 * Since we don't have a pigpen font, we'll return the characters 
 * and render them using a custom SVG-based component in React.
 */
export const pigpenCipher = (text) => {
  return text.toUpperCase().replace(/[^A-Z]/g, ''); // Keep only letters for visual
};

/**
 * Polybius Square (5x5, I/J merged)
 */
export const polybiusCipher = (text) => {
  const grid = {
    'A':'11','B':'12','C':'13','D':'14','E':'15',
    'F':'21','G':'22','H':'23','I':'24','J':'24','K':'25',
    'L':'31','M':'32','N':'33','O':'34','P':'35',
    'Q':'41','R':'42','S':'43','T':'44','U':'45',
    'V':'51','W':'52','X':'53','Y':'54','Z':'55'
  };
  return text.toUpperCase().split('').map(char => grid[char] || char).join(' ');
};

/**
 * Binary Cipher
 */
export const binaryCipher = (text) => {
  return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
};

/**
 * Mirror Cipher (Text reversal)
 */
export const mirrorCipher = (text) => {
  return text.split('').reverse().join('');
};

// Export all
export const ciphers = {
  caesar: caesarCipher,
  alphanum: alphanumCipher,
  morse: morseCode,
  pigpen: pigpenCipher,
  polybius: polybiusCipher,
  binary: binaryCipher,
  mirror: mirrorCipher,
  braille: (text) => text.toUpperCase(), // Handled by visual component
  semaphore: (text) => text.toUpperCase(), // Handled by visual component
  hieroglyph: (text) => text.toUpperCase(), // Handled by font
  runic: (text) => text.toUpperCase() // Handled by font
};
