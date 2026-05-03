import React from 'react';
import { useGameStore } from './useGameStore';
import { useLang } from './useLang';
import { GMPanel } from './GMPanel';
import HeadLine from './HeadLine';
import { wordPairs } from './wordBank';
import RoleCard from './RoleCard'; // Your component for passing phone

export default function Briefing() {
  const { 
    gmMode, 
    isBriefingStarted, 
    players, 
    wordPair, 
    imposterIdxs, 
    setGameSettings,
  } = useGameStore();
  const {lang}= useLang()

  const handleGMConfirm = (selectedWordPair, selectedImposterIdxs) => {
    // This is the CRITICAL part. It saves the GM's choice 
    // and THEN tells the app to show the player cards.
    setGameSettings({
      wordPair: selectedWordPair,
      imposterIdxs: selectedImposterIdxs,
      isBriefingStarted: true 
    });
  };
  // Logic: If GM is ON, wait for them to finish (isBriefingStarted)
  // If GM is OFF, we show the reveal grid immediately.
  const showGMPanel = gmMode && !isBriefingStarted;
  return (
    <div  id="page-roles">
               <HeadLine lang={lang} />

      {showGMPanel ? (
        <GMPanel 
          wordPairs={wordPairs} 
          onConfirm={handleGMConfirm} 
        />
      ) : (
        <div className="role-reveal-area">
           
           
           <div className="player-grid">
           <RoleCard players={players}
           secretWord={wordPair}
           lang={lang}
           isImposter={imposterIdxs} />

           </div>
        </div>
      )}
    </div>
  );
}