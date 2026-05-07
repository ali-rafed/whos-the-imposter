import React, { useState } from 'react';
import { useGameStore } from './useGameStore';
import HeadLine from "./HeadLine"
import { useLang } from './useLang';
import "./Tribunal.scss"
import Reveal from './Reveal';
const Tribunal = () => {
  const { players, imposterIdxs, numImposters} = useGameStore();
  const {lang}=useLang()
  // Track which player is currently holding the phone to vote
  const [voterIdx, setVoterIdx] = useState(0); 
  // Track actual vote counts: { playerIndex: totalVotes }
  const [voteCounts, setVoteCounts] = useState({});
  // Local selection for the CURRENT voter (reset every turn)
  const [selectedIndices, setSelectedIndices] = useState([]);
  // Final stage
  const [revealed, setRevealed] = useState(false);

  const t = {
    en: {
      vTitle: "THE TRIBUNAL",
      vWhoVotes: (name) => `${name}, cast your suspicion`,
      vVotesNeeded: (num) => `Select ${num} suspected imposter(s)`,
      vSubmitBtn: "CONFIRM VOTES",
      vRevealBtn: "REVEAL RESULTS",
      vWinner: "AGENTS WIN!",
      vLoser: "IMPOSTERS WIN!",
      vSecretWord: "The word was:",
      vImpostersWere: "The imposters were:"
    },
    ar: {
      vTitle: "المحكمة",
      vWhoVotes: (name) => `يا ${name}، أدلِ بصوتك`,
      vVotesNeeded: (num) => `اختر ${num} من المشتبه بهم`,
      vSubmitBtn: "تأكيد التصويت",
      vRevealBtn: "كشف النتائج",
      vWinner: "فاز العملاء!",
      vLoser: "فاز الجواسيس!",
      vSecretWord: "الكلمة كانت:",
      vImpostersWere: "الجواسيس كانوا:"
    }
  };

  const currentT = t[lang] || t.en;

  const toggleVote = (targetIdx) => {
    if (selectedIndices.includes(targetIdx)) {
      // If clicking an already selected person, unselect them
      setSelectedIndices(selectedIndices.filter(id => id !== targetIdx));
    } else {
      if (selectedIndices.length < numImposters) {
        // If we haven't reached the limit, just add them
        setSelectedIndices([...selectedIndices, targetIdx]);
      } else {
        // LIMIT REACHED: "Instant Change" Logic
        if (numImposters === 1) {
          // Simple case: Just replace the single vote
          setSelectedIndices([targetIdx]);
        } else {
          // Multi-vote case: Remove the first person selected and add the new one
          const shifted = [...selectedIndices.slice(1), targetIdx];
          setSelectedIndices(shifted);
        }
      }
    }
  };

  const handleNextVoter = () => {
    // 1. Add current selections to the global tally
    const newCounts = { ...voteCounts };
    selectedIndices.forEach(idx => {
      newCounts[idx] = (newCounts[idx] || 0) + 1;
    });
    setVoteCounts(newCounts);

    // 2. Move to next player or finish
    if (voterIdx < players.length - 1) {
      setVoterIdx(voterIdx + 1);
      setSelectedIndices([]); // Reset for next person
    } else {
      setRevealed(true);
    }
  };



  if (revealed) {
    return (
      <Reveal voteCounts={voteCounts}/>
    );
  }

  return (
    <div >
      <HeadLine lang={lang}/>
      <p>{players[voterIdx].name}</p>
      <p className="sub">{currentT.vVotesNeeded(numImposters)}</p>

      <div className="voter-section mt16">
        {players.map((p, i) => {
          if (i === voterIdx) return null; // Can't vote for yourself
          const isSelected = selectedIndices.includes(i);
          
          return (
            <div
            
              key={p.id} 
             >
            
            <div 
              className={`vote-option ${isSelected ? 'selected' : ''}`}
              onClick={() => toggleVote(i)}
            >
              <span className="vname">{p.name}</span>
              {isSelected && <span className="badge badge-accent">VOTED</span>}
            </div>
            </div>
          );
        })}
      </div>

      <button 
        className="btn btn-primary btn-full mt24" 
        disabled={selectedIndices.length !== numImposters}
        onClick={handleNextVoter}
      >
        {currentT.vSubmitBtn} ({selectedIndices.length}/{numImposters})
      </button>
    </div>
  );
};

export default Tribunal;