import React from 'react';
import { useGameStore } from './useGameStore';
import { useLang } from './useLang';
import { getRandomWord } from './wordBank';
const Reveal = ({ voteCounts }) => {
  const { players, imposterIdxs, wordPair, resetGame, 
    setGameSettings, numImposters,
    gameMode } = useGameStore();
    const{lang}=useLang()
  const t = {
    en: {
      vCivWin: "AGENTS WIN!",
      vImpWin: "IMPOSTERS WIN!",
      revLabel: "The secret imposters were:",
      roWordLabel: "SECRET WORD",
      roImpLabel: "IMPOSTER",
      vPlayAgain: "PLAY AGAIN",
      vHome: "HOME",
      vCorrectVoters: (names) => `Sharp eyes! ${names} suspected the truth.`
    },
    ar: {
      vCivWin: "فاز العملاء!",
      vImpWin: "فاز الجواسيس!",
      revLabel: "الجواسيس كانوا:",
      roWordLabel: "الكلمة السرية",
      roImpLabel: "جاسوس",
      vPlayAgain: "العب مرة أخرى",
      vHome: "القائمة الرئيسية",
      vCorrectVoters: (names) => `عيون حادة! ${names} كشفوا الحقيقة.`
    }
  };
console.log();
  const currentT = t[lang] || t.en;

  // 1. Calculate Results Logic
  const totalVotes = Object.values(voteCounts).reduce((a, b) => a + b, 0);
  
  // A simple win condition: Civilians win if the most voted person is an imposter
  const mostVotedIdx = Object.entries(voteCounts).reduce((a, b) => (b[1] > a[1] ? b : a), [0, 0])[0];
  const civWin = imposterIdxs.includes(parseInt(mostVotedIdx));

  const impNames = imposterIdxs.map(idx => players[idx].name);
  const word = wordPair[lang];
  const handlePlayAgain = () => {
    // 1. Generate new roles and words
    const indices = players.map((_, i) => i);
    const nextImposters = [];
    for (let i = 0; i < numImposters; i++) {
      const randomIdx = Math.floor(Math.random() * indices.length);
      nextImposters.push(indices.splice(randomIdx, 1)[0]);
    }

    // 2. Route based on the mode
    if (gameMode === 'gm') {
      setGameSettings({
        currentPage: 'briefing',
        isBriefingStarted: false, // Reset the "Start" state
        imposterIdxs: [],         // Clear old imposters for the GM to pick new ones
        wordPair: { en: '', ar: '' } // Clear old word
         }); 
      // Game Master Mode goes to the "Control Panel"
    } else {
      // Auto Mode goes straight to the "Role Cards"
      const newWord=getRandomWord();
      setGameSettings(
        { currentPage: 'briefing',
        imposterIdxs: nextImposters,         // Clear old imposters for the GM to pick new ones
        wordPair: newWord
      });
    }
  };
  
  return (
    <div className="reveal-box">
      {/* Result Badge */}
      <div className={`badge ${civWin ? 'badge-green' : 'badge-red'} mb16`}>
        {civWin ? currentT.vCivWin : currentT.vImpWin}
      </div>

      <p className="sub" style={{ marginBottom: '4px' }}>{currentT.revLabel}</p>
      
      {/* Imposter Names */}
      <div 
        className="reveal-name" 
        style={{ color: civWin ? 'var(--col-red)' : 'var(--col-accent)' }}
      >
        {impNames.join(' & ')}
      </div>

      <div className="reveal-verdict">
        {currentT.roWordLabel}: <span className="accent">{wordPair[lang]}</span>
      </div>

      {/* Vote Statistics Card */}
      <div className="card mb16 mt16">
        {players.map((p, i) => {
          const isImp = imposterIdxs.includes(i);
          const votes = voteCounts[i] || 0;
          const pct = totalVotes ? Math.round((votes / totalVotes) * 100) : 0;

          return (
            <div key={p.id} className="mb12">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: 'clamp(12px, 2vw, 14px)' }}>
                  {p.name}
                </span>
                <span className='flex gap8'>
                {isImp && <span className="badge badge-red  ">{currentT.roImpLabel}</span>}
                <span className="badge badge-accent">{votes} votes</span>
                </span>
              </div>
              
              {/* Progress Bar for Votes */}
              <div className="vote-bar">
                <div className="vote-bar-fill" style={{ width: `${pct}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex gap8 mt16 flex-wrap" style={{ justifyContent: 'center' }}>
        <button className="btn btn-outline" onClick={handlePlayAgain}>
          {currentT.vPlayAgain}
        </button>
        <button className="btn btn-ghost" onClick={resetGame}>
          {currentT.vHome}
        </button>
      </div>
    </div>
  );
};

export default Reveal;