export const VALID_RULES = [
  'Exactly ONE mark (卐) in ONE party box',
  'Mark must be clearly inside a single cell',
  'Election officer signature present at bottom',
  'Ballot is intact — no tears or damage',
  'No identifying marks, names, or writing',
];

export const INVALID_RULES: { label: string; desc: string }[] = [
  { label: 'Multiple Marks',     desc: 'Two or more cells are marked' },
  { label: 'Blank Ballot',       desc: 'No mark made anywhere on the ballot' },
  { label: 'Border Mark',        desc: 'Mark falls between two cells — intent unclear' },
  { label: 'Identifying Marks',  desc: 'Name, signature, or other writing on ballot' },
  { label: 'No Signature',       desc: 'Election officer signature is missing' },
  { label: 'Torn / Damaged',     desc: 'Physical damage makes intent unreadable' },
  { label: 'Smudged Mark',       desc: 'Ink has spread beyond the cell — intent illegible' },
  { label: 'Fingerprint',        desc: 'Voter\'s ink thumbprint found on ballot — identity revealed' },
];
