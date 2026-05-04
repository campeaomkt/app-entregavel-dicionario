import React from 'react';
import { NOTES } from '../constants';

interface PianoKeyboardProps {
  highlightedNotes: number[]; // Indices 0-11
}

const PianoKeyboard: React.FC<PianoKeyboardProps> = ({ highlightedNotes }) => {
  // We'll show exactly two octaves + C as per the reference image (15 white keys)
  const whiteKeys = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24];
  const blackKeys = [
    { index: 1, leftShift: 1 },  // C#
    { index: 3, leftShift: 2 },  // Eb
    { index: 6, leftShift: 4 },  // F#
    { index: 8, leftShift: 5 },  // G#
    { index: 10, leftShift: 6 }, // Bb
    { index: 13, leftShift: 8 }, // C# 2nd
    { index: 15, leftShift: 9 }, // Eb 2nd
    { index: 18, leftShift: 11 },// F# 2nd
    { index: 20, leftShift: 12 },// G# 2nd
    { index: 22, leftShift: 13 },// Bb 2nd
  ];

  // Helper to check if a note index is highlighted
  // Since we only receive 0-11, we check (index % 12)
  const isHigh = (idx: number) => highlightedNotes.includes(idx % 12);

  return (
    <div className="relative w-full aspect-[2.5/1] bg-white rounded-[15px] overflow-hidden border-[4px] border-black select-none">
      <div className="flex h-full w-full">
        {whiteKeys.map((idx, i) => (
          <div
            key={i}
            className={`flex-1 border-r border-black last:border-r-0 transition-colors duration-200 ${
              isHigh(idx) ? 'bg-[#ff0000]' : 'bg-white'
            }`}
          />
        ))}
      </div>

      {/* Black Keys */}
      {blackKeys.map((bk, i) => (
        <div
          key={i}
          className={`absolute top-0 w-[4.5%] h-[60%] border-x border-b border-black rounded-b-[4px] transition-colors duration-200 ${
            isHigh(bk.index) ? 'bg-[#ff0000]' : 'bg-black'
          }`}
          style={{
            left: `${(bk.leftShift * (100 / 15)) - 2.25}%`,
          }}
        />
      ))}
    </div>
  );
};

export default PianoKeyboard;
