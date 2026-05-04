import React from 'react';
import { GoogleGenAI } from "@google/genai";

const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];

const VARIATIONS = [
  { label: 'Maior', value: 'major', intervals: [0, 4, 7] },
  { label: 'Menor', value: 'minor', intervals: [0, 3, 7] },
  { label: '7', value: '7', intervals: [0, 4, 7, 10] },
  { label: 'm7', value: 'm7', intervals: [0, 3, 7, 10] },
  { label: 'maj7', value: 'maj7', intervals: [0, 4, 7, 11] },
  { label: 'dim', value: 'dim', intervals: [0, 3, 6] },
  { label: 'sus4', value: 'sus4', intervals: [0, 5, 7] },
];

export const getChordNotes = (baseNote: string, variationValue: string) => {
  const startIndex = NOTES.indexOf(baseNote);
  const variation = VARIATIONS.find(v => v.value === variationValue);
  
  if (!variation || startIndex === -1) return [];
  
  return variation.intervals.map(interval => (startIndex + interval) % 12);
};

export { NOTES, VARIATIONS };
