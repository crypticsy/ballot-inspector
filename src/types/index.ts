export type GameState = 'start' | 'playing' | 'end';

export type InvalidReason =
  | 'multiple_marks'
  | 'blank'
  | 'border_mark'
  | 'identifying_marks'
  | 'no_signature'
  | 'torn';

export interface Mark {
  row: number;
  col: number;
  isBorder?: boolean;
  borderDir?: 'right' | 'bottom';
  markStyle?: 'check' | 'cross' | 'dot' | 'scribble';
}

export interface BallotData {
  id: number;
  isValid: boolean;
  marks: Mark[];
  hasSignature: boolean;
  hasTear: boolean;
  tearPosition?: 'top-right' | 'bottom-right' | 'top-left';
  identifyingText?: string;
  identifyingPos?: { top: string; left: string };
  invalidReason?: InvalidReason;
  invalidReasonDisplay?: string;
  // subtle trick: valid ballot with slightly sloppy-looking mark (still valid)
  sloppyMark?: boolean;
}

export interface PlayerDecision {
  ballotId: number;
  decision: 'valid' | 'invalid';
  correct: boolean;
  invalidReason?: InvalidReason;
}

export interface GameStats {
  score: number;
  correct: number;
  incorrect: number;
  totalSeen: number;
  decisions: PlayerDecision[];
  timeElapsed: number;
}

export interface PartySymbol {
  id: number;
  name: string;
  nameNepali: string;
  icon: import('react-icons').IconType;
}
