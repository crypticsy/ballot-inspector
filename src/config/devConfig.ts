/**
 * DEV CONFIG — toggle ballot types on/off for testing.
 * Set `DEV_MODE` to true to use the filters below.
 * In production (DEV_MODE = false) all types are included.
 */
export const DEV_MODE = false;

export const ENABLED_BALLOT_TYPES = {
  valid: false,
  multiple_marks: false,
  blank: false,
  border_mark: false,
  identifying_marks: false,
  no_signature: false,
  torn: false,
  smudged_mark: false,
  fingerprint: true,
  mark_on_symbol: false,
  double_stamp: false,
};
