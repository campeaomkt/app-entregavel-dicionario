import React from 'react';
import { GoogleGenAI } from "@google/genai";

const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];

const VARIATIONS = [
  { label: 'Maior', value: 'major', intervals: [0, 4, 7] },
  { label: 'Menor', value: 'minor', intervals: [0, 3, 7] },
  { label: 'Diminuto', value: 'dim', intervals: [0, 3, 6] },
  { label: 'Aumentado', value: 'aug', intervals: [0, 4, 8] },
  { label: 'Sus2', value: 'sus2', intervals: [0, 2, 7] },
  { label: 'Sus4', value: 'sus4', intervals: [0, 5, 7] },
  { label: 'add9', value: 'add9', intervals: [0, 4, 7, 14] },
  { label: 'add11', value: 'add11', intervals: [0, 4, 7, 17] },
  { label: 'Maj7', value: 'Maj7', intervals: [0, 4, 7, 11] },
  { label: 'm7', value: 'm7', intervals: [0, 3, 7, 10] },
  { label: 'm7(b5)', value: 'm7b5', intervals: [0, 3, 6, 10] },
  { label: 'dim7', value: 'dim7', intervals: [0, 3, 6, 9] },
  { label: '6', value: '6', intervals: [0, 4, 7, 9] },
  { label: 'm6', value: 'm6', intervals: [0, 3, 7, 9] },
  { label: '7', value: '7', intervals: [0, 4, 7, 10] },
  { label: '7(b9)', value: '7b9', intervals: [0, 4, 7, 10, 13] },
  { label: '7(#9)', value: '7#9', intervals: [0, 4, 7, 10, 15] },
  { label: '7(b5)', value: '7b5', intervals: [0, 4, 6, 10] },
  { label: '7(#5)', value: '7#5', intervals: [0, 4, 8, 10] },
  { label: '7(b13)', value: '7b13', intervals: [0, 4, 7, 10, 20] },
];

export const getChordNotes = (baseNote: string, variationValue: string) => {
  const startIndex = NOTES.indexOf(baseNote);
  const variation = VARIATIONS.find(v => v.value === variationValue);
  
  if (!variation || startIndex === -1) return [];
  
  // Return absolute indices starting from the tonic. 
  // For a two-octave keyboard, indices will be between 0 and 22.
  return variation.intervals.map(interval => startIndex + interval);
};

export { NOTES, VARIATIONS };
