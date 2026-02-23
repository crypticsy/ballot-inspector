import type { PartySymbol } from '../types';

// 58 party symbols matching Nepal's PR ballot layout (5 cols × 12 rows, last row 3 items)
export const PARTY_SYMBOLS: PartySymbol[] = [
  // Row 0
  { id: 1,  name: 'Sun',           nameNepali: 'सूर्य',        icon: '☀' },
  { id: 2,  name: 'Tree',          nameNepali: 'रुख',          icon: '🌳' },
  { id: 3,  name: 'Star',          nameNepali: 'तारा',         icon: '★' },
  { id: 4,  name: 'Bell',          nameNepali: 'घण्टी',        icon: '🔔' },
  { id: 5,  name: 'Plow',          nameNepali: 'हलो',          icon: '⚒' },
  // Row 1
  { id: 6,  name: 'Umbrella',      nameNepali: 'छाता',         icon: '☂' },
  { id: 7,  name: 'Megaphone',     nameNepali: 'माइक',         icon: '📢' },
  { id: 8,  name: 'Bicycle',       nameNepali: 'साइकल',        icon: '🚲' },
  { id: 9,  name: 'Log',           nameNepali: 'काठ',          icon: '🪵' },
  { id: 10, name: 'Cup',           nameNepali: 'गिलास',        icon: '🥛' },
  // Row 2
  { id: 11, name: 'Eye',           nameNepali: 'आँखा',         icon: '👁' },
  { id: 12, name: 'Praying Hands', nameNepali: 'नमस्ते',       icon: '🙏' },
  { id: 13, name: 'Rooster',       nameNepali: 'भाले',         icon: '🐓' },
  { id: 14, name: 'Pitcher',       nameNepali: 'गाग्री',       icon: '🫗' },
  { id: 15, name: 'Open Hand',     nameNepali: 'हात',          icon: '✋' },
  // Row 3
  { id: 16, name: 'Basket',        nameNepali: 'डोको',         icon: '🧺' },
  { id: 17, name: 'Hammer Sickle', nameNepali: 'हँसिया हथौडा', icon: '☭' },
  { id: 18, name: 'Lotus',         nameNepali: 'कमल',          icon: '🪷' },
  { id: 19, name: 'Guitar',        nameNepali: 'गिटार',        icon: '🎸' },
  { id: 20, name: 'House',         nameNepali: 'घर',           icon: '🏠' },
  // Row 4
  { id: 21, name: 'Sickle',        nameNepali: 'हँसिया',       icon: '🌙' },
  { id: 22, name: 'Torch',         nameNepali: 'मशाल',         icon: '🔦' },
  { id: 23, name: 'Clock',         nameNepali: 'घडी',          icon: '⏰' },
  { id: 24, name: 'Scissors',      nameNepali: 'कैंची',        icon: '✂' },
  { id: 25, name: 'Pickaxe',       nameNepali: 'कुदालो',       icon: '⛏' },
  // Row 5
  { id: 26, name: 'Conch',         nameNepali: 'शंख',          icon: '🐚' },
  { id: 27, name: 'Flower Pot',    nameNepali: 'फूलदानी',      icon: '🪴' },
  { id: 28, name: 'Battery',       nameNepali: 'ब्याट्री',     icon: '🔋' },
  { id: 29, name: 'Farmer',        nameNepali: 'किसान',        icon: '👨‍🌾' },
  { id: 30, name: 'Hands Offering',nameNepali: 'भेटी',         icon: '🤲' },
  // Row 6
  { id: 31, name: 'Spectacles',    nameNepali: 'चश्मा',        icon: '👓' },
  { id: 32, name: 'Bee',           nameNepali: 'मौरी',         icon: '🐝' },
  { id: 33, name: 'Meditating',    nameNepali: 'ध्यान',        icon: '🧘' },
  { id: 34, name: 'Cupped Hands',  nameNepali: 'हत्केला',      icon: '🤲' },
  { id: 35, name: 'Harvester',     nameNepali: 'किसानी',       icon: '👩‍🌾' },
  // Row 7
  { id: 36, name: 'Trident',       nameNepali: 'त्रिशूल',      icon: '🔱' },
  { id: 37, name: 'Horse',         nameNepali: 'घोडा',         icon: '🐎' },
  { id: 38, name: 'Rose',          nameNepali: 'गुलाब',        icon: '🌹' },
  { id: 39, name: 'Dharma Wheel',  nameNepali: 'धर्मचक्र',    icon: '☸' },
  { id: 40, name: 'Handshake',     nameNepali: 'हाथ मिलाई',   icon: '🤝' },
  // Row 8
  { id: 41, name: 'Water Pump',    nameNepali: 'धारा',         icon: '⛽' },
  { id: 42, name: 'Whistle',       nameNepali: 'सिट्ठी',       icon: '📣' },
  { id: 43, name: 'Stool',         nameNepali: 'पिरा',         icon: '🪑' },
  { id: 44, name: 'Woman',         nameNepali: 'महिला',        icon: '👩' },
  { id: 45, name: 'Oil Lamp',      nameNepali: 'दियो',         icon: '🪔' },
  // Row 9
  { id: 46, name: 'Bus',           nameNepali: 'बस',           icon: '🚌' },
  { id: 47, name: 'Ball',          nameNepali: 'बल',           icon: '⚽' },
  { id: 48, name: 'Vase',          nameNepali: 'कलश',          icon: '🏺' },
  { id: 49, name: 'Star of David', nameNepali: 'षट्कोण',       icon: '✡' },
  { id: 50, name: 'Grinding Stone',nameNepali: 'जाँतो',        icon: '🪨' },
  // Row 10
  { id: 51, name: 'Bottle',        nameNepali: 'बोतल',         icon: '🍶' },
  { id: 52, name: 'Book',          nameNepali: 'किताब',        icon: '📖' },
  { id: 53, name: 'Endless Knot',  nameNepali: 'अनन्त',        icon: '♾' },
  { id: 54, name: 'Mobile Phone',  nameNepali: 'मोबाइल',       icon: '📱' },
  { id: 55, name: 'Peace Sign',    nameNepali: 'शान्ति',       icon: '✌' },
  // Row 11 (last row, only 3 items)
  { id: 56, name: 'Lion',          nameNepali: 'सिंह',         icon: '🦁' },
  { id: 57, name: 'Sailboat',      nameNepali: 'डुङ्गा',       icon: '⛵' },
  { id: 58, name: 'Cow',           nameNepali: 'गाई',          icon: '🐄' },
];

export const COLS = 5;
export const ROWS = 12; // 11 full rows + 1 partial

// Given a flat index, return {row, col}
export function indexToCell(index: number): { row: number; col: number } {
  return { row: Math.floor(index / COLS), col: index % COLS };
}

// Total valid cells
export const TOTAL_CELLS = PARTY_SYMBOLS.length; // 58
