import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { NOTES } from '../constants';

interface PianoKeyboardProps {
  highlightedNotes: number[]; // Indices 0-11
}

const PianoKeyboard: React.FC<PianoKeyboardProps> = ({ highlightedNotes }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current && contentRef.current) {
        const parentWidth = containerRef.current.offsetWidth;
        const width = contentRef.current.offsetWidth;
        setDragConstraints({ left: -(width - parentWidth), right: 0 });
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  // Find the lowest note to determine the keyboard's starting point (always start at a C)
  const lowestNote = highlightedNotes.length > 0 ? Math.min(...highlightedNotes) : 0;
  const startOffset = Math.floor(lowestNote / 12) * 12;

  // Show exactly 3 full octaves (22 white keys including the last C)
  const whiteKeyPatterns = [0, 2, 4, 5, 7, 9, 11];
  const whiteKeys: number[] = [];
  for (let i = 0; i < 22; i++) {
    const octave = Math.floor(i / 7);
    const patternIdx = i % 7;
    whiteKeys.push(startOffset + (octave * 12) + whiteKeyPatterns[patternIdx]);
  }

  // Black keys (5 per octave)
  const blackKeyPatterns = [1, 3, 6, 8, 10];
  const blackKeys: { index: number; leftShift: number }[] = [];
  
  for (let oct = 0; oct < 4; oct++) {
    blackKeyPatterns.forEach((p, pIdx) => {
      const idx = startOffset + (oct * 12) + p;
      const whiteKeyPosInOctave = [0, 1, 3, 4, 5]; 
      const shift = (oct * 7) + whiteKeyPosInOctave[pIdx] + 1;
      
      if (shift < 22) {
        blackKeys.push({ index: idx, leftShift: shift });
      }
    });
  }

  const isHigh = (idx: number) => highlightedNotes.includes(idx);

  return (
    <div className="w-full max-w-[340px] md:max-w-3xl relative group mx-auto">
      <div 
        ref={containerRef}
        className="w-full overflow-hidden rounded-[15px] md:rounded-[20px] border-[4px] md:border-[6px] border-black select-none touch-none bg-white shadow-xl"
      >
        <motion.div 
          ref={contentRef}
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          initial={false}
          animate={{ x: 0 }}
          className="relative h-[110px] md:h-[220px] flex bg-white cursor-grab active:cursor-grabbing"
          style={{ width: '150%' }} 
        >
          <div className="flex h-full w-full">
            {whiteKeys.map((idx, i) => (
              <div
                key={i}
                className={`flex-1 border-r border-black last:border-r-0 transition-colors duration-150 ${
                  isHigh(idx) ? 'bg-[#ff3b3b]' : 'bg-white'
                }`}
              />
            ))}
          </div>

          {/* Black Keys */}
          {blackKeys.map((bk, i) => (
            <div
              key={i}
              className={`absolute top-0 w-[3.5%] h-[60%] border-x border-b border-black rounded-b-[2px] transition-colors duration-150 ${
                isHigh(bk.index) ? 'bg-[#ff3b3b]' : 'bg-black'
              }`}
              style={{
                left: `${(bk.leftShift * (100 / 22)) - 1.75}%`,
              }}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Visual fade hint */}
      <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none rounded-r-[20px]" />
    </div>
  );
};

export default PianoKeyboard;
