/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NOTES, VARIATIONS, getChordNotes } from './constants';
import PianoKeyboard from './components/PianoKeyboard';

export default function App() {
  const [tom, setTom] = useState('C');
  const [tipo, setTipo] = useState('major');
  const [chordNotes, setChordNotes] = useState<number[]>([0, 4, 7]);

  useEffect(() => {
    setChordNotes(getChordNotes(tom, tipo));
  }, [tom, tipo]);

  const currentVariation = VARIATIONS.find(v => v.value === tipo);

  return (
    <div className="min-h-[100dvh] bg-[#1a1a1a] text-white flex flex-col items-center p-4 pt-10">
      {/* LOGO */}
      <div className="mb-12 flex items-center gap-4">
        <div className="bg-[#ff0000] p-1 rounded-sm flex gap-[2px]">
          <div className="bg-white w-4 h-12"></div>
          <div className="bg-white w-4 h-12"></div>
          <div className="bg-white w-4 h-12"></div>
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-3xl font-black tracking-tight">DICIONÁRIO</span>
          <span className="text-3xl font-black tracking-tight">DE ACORDES</span>
        </div>
      </div>

      {/* CONTROLES */}
      <div className="w-full max-w-sm space-y-9 mb-9">
        <div className="campo">
          <label className="custom-label" htmlFor="tom-select">Tom</label>
          <select 
            id="tom-select"
            className="custom-select"
            value={tom}
            onChange={(e) => setTom(e.target.value)}
          >
            {NOTES.map((note) => (
              <option key={note} value={note}>{note}</option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label className="custom-label" htmlFor="variation-select">Variação</label>
          <select 
            id="variation-select"
            className="custom-select"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            {VARIATIONS.map((v) => (
              <option key={v.value} value={v.value}>{v.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* CARD DO ACORDE */}
      <div className="w-full max-w-sm bg-[#0d0d0d] rounded-[24px] p-8 pb-12 mb-8 flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${tom}-${tipo}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="w-full flex flex-col items-center"
          >
            <h2 className="text-[42px] font-black text-[#ff3b3b] mb-10 tracking-tight">
              {tom} {currentVariation?.label}
            </h2>
            
            <div className="w-full mb-12">
               <PianoKeyboard highlightedNotes={chordNotes} />
            </div>

            <p className="text-[32px] text-white font-medium tracking-widest">
              {chordNotes.map(idx => NOTES[idx]).join(' - ')}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RODAPÉ */}
      <footer className="mt-auto py-8">
        <p className="text-2xl text-[#777] italic font-serif">
          By Eliab Teclas
        </p>
      </footer>
    </div>
  );
}

