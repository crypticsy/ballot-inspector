import type { BallotData, Mark } from '../types';
import { TOTAL_CELLS, COLS, ROWS, indexToCell } from './parties';

let ballotCounter = 0;

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomCell(): Mark {
  const idx = randomInt(0, TOTAL_CELLS - 1);
  return indexToCell(idx);
}

function randomCells(count: number): Mark[] {
  const chosen = new Set<number>();
  while (chosen.size < count) {
    chosen.add(randomInt(0, TOTAL_CELLS - 1));
  }
  return Array.from(chosen).map((idx) => indexToCell(idx));
}

// Random Nepali-sounding names for identifying marks
const NEPALI_NAMES = [
  'राम बहादुर', 'सीता देवी', 'कृष्ण प्रसाद', 'लक्ष्मी कुमारी',
  'बिमल थापा', 'सुनिता श्रेष्ठ', 'हरि बहादुर', 'मनिता गुरुङ',
  'RB-042', 'VTR-7', 'रमेश', '✗ VOID',
];

// Random identifying mark positions (avoid overlapping header/footer)
const ID_POSITIONS = [
  { top: '15%', left: '5%' },
  { top: '15%', left: '70%' },
  { top: '45%', left: '3%' },
  { top: '60%', left: '72%' },
  { top: '80%', left: '10%' },
  { top: '80%', left: '65%' },
];

function generateValidBallot(): BallotData {
  const mark = randomCell();
  const sloppyMark = Math.random() < 0.2; // 20% chance of sloppy-looking (still valid)
  return {
    id: ++ballotCounter,
    isValid: true,
    marks: [{ ...mark, markStyle: 'check' }],
    hasSignature: true,
    hasTear: false,
    sloppyMark,
  };
}

function generateMultipleMarksBallot(): BallotData {
  const count = randomInt(2, 4);
  const marks = randomCells(count).map((m) => ({ ...m, markStyle: 'check' as const }));
  return {
    id: ++ballotCounter,
    isValid: false,
    marks,
    hasSignature: true,
    hasTear: false,
    invalidReason: 'multiple_marks',
    invalidReasonDisplay:
      'TWO OR MORE PARTY SYMBOLS WERE MARKED — Only one mark is permitted per ballot.',
  };
}

function generateBlankBallot(): BallotData {
  return {
    id: ++ballotCounter,
    isValid: false,
    marks: [],
    hasSignature: true,
    hasTear: false,
    invalidReason: 'blank',
    invalidReasonDisplay:
      'NO PARTY SYMBOL WAS MARKED — A valid ballot must have exactly one mark.',
  };
}

function generateBorderMarkBallot(): BallotData {
  // Pick a cell that has a right or bottom neighbor
  const row = randomInt(0, ROWS - 2);
  const col = randomInt(0, COLS - 2);
  const dir = Math.random() < 0.5 ? 'right' : 'bottom';
  return {
    id: ++ballotCounter,
    isValid: false,
    marks: [{ row, col, isBorder: true, borderDir: dir, markStyle: 'check' }],
    hasSignature: true,
    hasTear: false,
    invalidReason: 'border_mark',
    invalidReasonDisplay:
      'MARK FALLS ON THE BORDER BETWEEN TWO CELLS — Voter intent is ambiguous.',
  };
}

function generateIdentifyingMarksBallot(): BallotData {
  const mark = randomCell();
  const text = NEPALI_NAMES[randomInt(0, NEPALI_NAMES.length - 1)];
  const pos = ID_POSITIONS[randomInt(0, ID_POSITIONS.length - 1)];
  // 50% chance: valid mark + identifying text; 50% chance: just identifying text, no mark
  const hasValidMark = Math.random() < 0.5;
  return {
    id: ++ballotCounter,
    isValid: false,
    marks: hasValidMark ? [{ ...mark, markStyle: 'check' }] : [],
    hasSignature: true,
    hasTear: false,
    identifyingText: text,
    identifyingPos: pos,
    invalidReason: 'identifying_marks',
    invalidReasonDisplay:
      "VOTER'S IDENTITY REVEALED — Writing, marks, or signatures that identify the voter invalidate the ballot.",
  };
}

function generateNoSignatureBallot(): BallotData {
  const mark = randomCell();
  return {
    id: ++ballotCounter,
    isValid: false,
    marks: [{ ...mark, markStyle: 'check' }],
    hasSignature: false,
    hasTear: false,
    invalidReason: 'no_signature',
    invalidReasonDisplay:
      "ELECTION OFFICER'S SIGNATURE IS MISSING — Unsigned ballots cannot be counted.",
  };
}

function generateTornBallot(): BallotData {
  const mark = randomCell();
  const tearPositions = ['top-right', 'bottom-right', 'top-left'] as const;
  const tearPosition = tearPositions[randomInt(0, 2)];
  // 40% chance the tear obscures where the mark would be (ballot has mark elsewhere)
  return {
    id: ++ballotCounter,
    isValid: false,
    marks: [{ ...mark, markStyle: 'check' }],
    hasSignature: true,
    hasTear: true,
    tearPosition,
    invalidReason: 'torn',
    invalidReasonDisplay:
      'BALLOT IS PHYSICALLY DAMAGED — A torn or mutilated ballot cannot be accepted.',
  };
}

type Generator = () => BallotData;

const INVALID_GENERATORS: Generator[] = [
  generateMultipleMarksBallot,
  generateMultipleMarksBallot, // weighted double for frequency
  generateBlankBallot,
  generateBorderMarkBallot,
  generateIdentifyingMarksBallot,
  generateNoSignatureBallot,
  generateTornBallot,
];

export function generateBallot(): BallotData {
  // 45% valid, 55% invalid
  if (Math.random() < 0.45) {
    return generateValidBallot();
  }
  const gen = INVALID_GENERATORS[randomInt(0, INVALID_GENERATORS.length - 1)];
  return gen();
}

export function generateBallotQueue(count: number): BallotData[] {
  ballotCounter = 0;
  const ballots: BallotData[] = [];
  // Ensure at least some of each type
  const guaranteed: Generator[] = [
    generateValidBallot,
    generateValidBallot,
    generateMultipleMarksBallot,
    generateBlankBallot,
    generateBorderMarkBallot,
    generateIdentifyingMarksBallot,
    generateNoSignatureBallot,
    generateTornBallot,
  ];
  for (const gen of guaranteed) {
    ballots.push(gen());
  }
  while (ballots.length < count) {
    ballots.push(generateBallot());
  }
  // Shuffle
  for (let i = ballots.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ballots[i], ballots[j]] = [ballots[j], ballots[i]];
  }
  // Re-assign sequential IDs
  ballots.forEach((b, i) => (b.id = i + 1));
  return ballots.slice(0, count);
}
