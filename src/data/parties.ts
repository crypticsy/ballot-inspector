import type { PartySymbol } from '../types';
import {
  FaSun, FaTree, FaStar, FaBell, FaUmbrella, FaBullhorn, FaBicycle,
  FaMugHot, FaEye, FaHandsPraying, FaHand, FaBasketShopping, FaGuitar,
  FaHouse, FaMoon, FaFire, FaClock, FaScissors, FaSeedling, FaBatteryFull,
  FaHandHoldingHeart, FaGlasses, FaSpa, FaHandsHolding, FaHandshake,
  FaPersonDress, FaBus, FaFutbol, FaStarOfDavid, FaBook, FaInfinity,
  FaMobile, FaPeace, FaSailboat, FaFaucetDrip, FaBottleWater, FaHorse,
} from 'react-icons/fa6';
import {
  GiPlow, GiLog, GiRooster, GiJug, GiHammerSickle, GiLotus,
  GiWarPick, GiNautilusShell, GiFarmer, GiBee, GiTrident, GiRose,
  GiChakram, GiWhistle, GiWoodenChair, GiMagicLamp, GiPorcelainVase,
  GiPestleMortar, GiLion, GiCow, GiScythe,
} from 'react-icons/gi';

// 58 party symbols matching Nepal's PR ballot layout (5 cols × 12 rows, last row 3 items)
export const PARTY_SYMBOLS: PartySymbol[] = [
  // Row 0
  { id: 1,  name: 'Sun',           nameNepali: 'सूर्य',        icon: FaSun },
  { id: 2,  name: 'Tree',          nameNepali: 'रुख',          icon: FaTree },
  { id: 3,  name: 'Star',          nameNepali: 'तारा',         icon: FaStar },
  { id: 4,  name: 'Bell',          nameNepali: 'घण्टी',        icon: FaBell },
  { id: 5,  name: 'Plow',          nameNepali: 'हलो',          icon: GiPlow },
  // Row 1
  { id: 6,  name: 'Umbrella',      nameNepali: 'छाता',         icon: FaUmbrella },
  { id: 7,  name: 'Megaphone',     nameNepali: 'माइक',         icon: FaBullhorn },
  { id: 8,  name: 'Bicycle',       nameNepali: 'साइकल',        icon: FaBicycle },
  { id: 9,  name: 'Log',           nameNepali: 'काठ',          icon: GiLog },
  { id: 10, name: 'Cup',           nameNepali: 'गिलास',        icon: FaMugHot },
  // Row 2
  { id: 11, name: 'Eye',           nameNepali: 'आँखा',         icon: FaEye },
  { id: 12, name: 'Praying Hands', nameNepali: 'नमस्ते',       icon: FaHandsPraying },
  { id: 13, name: 'Rooster',       nameNepali: 'भाले',         icon: GiRooster },
  { id: 14, name: 'Pitcher',       nameNepali: 'गाग्री',       icon: GiJug },
  { id: 15, name: 'Open Hand',     nameNepali: 'हात',          icon: FaHand },
  // Row 3
  { id: 16, name: 'Basket',        nameNepali: 'डोको',         icon: FaBasketShopping },
  { id: 17, name: 'Hammer Sickle', nameNepali: 'हँसिया हथौडा', icon: GiHammerSickle },
  { id: 18, name: 'Lotus',         nameNepali: 'कमल',          icon: GiLotus },
  { id: 19, name: 'Guitar',        nameNepali: 'गिटार',        icon: FaGuitar },
  { id: 20, name: 'House',         nameNepali: 'घर',           icon: FaHouse },
  // Row 4
  { id: 21, name: 'Sickle',        nameNepali: 'हँसिया',       icon: FaMoon },
  { id: 22, name: 'Torch',         nameNepali: 'मशाल',         icon: FaFire },
  { id: 23, name: 'Clock',         nameNepali: 'घडी',          icon: FaClock },
  { id: 24, name: 'Scissors',      nameNepali: 'कैंची',        icon: FaScissors },
  { id: 25, name: 'Pickaxe',       nameNepali: 'कुदालो',       icon: GiWarPick },
  // Row 5
  { id: 26, name: 'Conch',         nameNepali: 'शंख',          icon: GiNautilusShell },
  { id: 27, name: 'Flower Pot',    nameNepali: 'फूलदानी',      icon: FaSeedling },
  { id: 28, name: 'Battery',       nameNepali: 'ब्याट्री',     icon: FaBatteryFull },
  { id: 29, name: 'Farmer',        nameNepali: 'किसान',        icon: GiFarmer },
  { id: 30, name: 'Hands Offering',nameNepali: 'भेटी',         icon: FaHandHoldingHeart },
  // Row 6
  { id: 31, name: 'Spectacles',    nameNepali: 'चश्मा',        icon: FaGlasses },
  { id: 32, name: 'Bee',           nameNepali: 'मौरी',         icon: GiBee },
  { id: 33, name: 'Meditating',    nameNepali: 'ध्यान',        icon: FaSpa },
  { id: 34, name: 'Cupped Hands',  nameNepali: 'हत्केला',      icon: FaHandsHolding },
  { id: 35, name: 'Harvester',     nameNepali: 'किसानी',       icon: GiScythe },
  // Row 7
  { id: 36, name: 'Trident',       nameNepali: 'त्रिशूल',      icon: GiTrident },
  { id: 37, name: 'Horse',         nameNepali: 'घोडा',         icon: FaHorse },
  { id: 38, name: 'Rose',          nameNepali: 'गुलाब',        icon: GiRose },
  { id: 39, name: 'Dharma Wheel',  nameNepali: 'धर्मचक्र',    icon: GiChakram },
  { id: 40, name: 'Handshake',     nameNepali: 'हाथ मिलाई',   icon: FaHandshake },
  // Row 8
  { id: 41, name: 'Water Pump',    nameNepali: 'धारा',         icon: FaFaucetDrip },
  { id: 42, name: 'Whistle',       nameNepali: 'सिट्ठी',       icon: GiWhistle },
  { id: 43, name: 'Stool',         nameNepali: 'पिरा',         icon: GiWoodenChair },
  { id: 44, name: 'Woman',         nameNepali: 'महिला',        icon: FaPersonDress },
  { id: 45, name: 'Oil Lamp',      nameNepali: 'दियो',         icon: GiMagicLamp },
  // Row 9
  { id: 46, name: 'Bus',           nameNepali: 'बस',           icon: FaBus },
  { id: 47, name: 'Ball',          nameNepali: 'बल',           icon: FaFutbol },
  { id: 48, name: 'Vase',          nameNepali: 'कलश',          icon: GiPorcelainVase },
  { id: 49, name: 'Star of David', nameNepali: 'षट्कोण',       icon: FaStarOfDavid },
  { id: 50, name: 'Grinding Stone',nameNepali: 'जाँतो',        icon: GiPestleMortar },
  // Row 10
  { id: 51, name: 'Bottle',        nameNepali: 'बोतल',         icon: FaBottleWater },
  { id: 52, name: 'Book',          nameNepali: 'किताब',        icon: FaBook },
  { id: 53, name: 'Endless Knot',  nameNepali: 'अनन्त',        icon: FaInfinity },
  { id: 54, name: 'Mobile Phone',  nameNepali: 'मोबाइल',       icon: FaMobile },
  { id: 55, name: 'Peace Sign',    nameNepali: 'शान्ति',       icon: FaPeace },
  // Row 11 (last row, only 3 items)
  { id: 56, name: 'Lion',          nameNepali: 'सिंह',         icon: GiLion },
  { id: 57, name: 'Sailboat',      nameNepali: 'डुङ्गा',       icon: FaSailboat },
  { id: 58, name: 'Cow',           nameNepali: 'गाई',          icon: GiCow },
];

export const COLS = 5;
export const ROWS = 12; // 11 full rows + 1 partial

// Given a flat index, return {row, col}
export function indexToCell(index: number): { row: number; col: number } {
  return { row: Math.floor(index / COLS), col: index % COLS };
}

// Total valid cells
export const TOTAL_CELLS = PARTY_SYMBOLS.length; // 58
