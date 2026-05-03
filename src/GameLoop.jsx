import React, { useState } from 'react';
import { useGameStore } from './useGameStore';

export default function GameLoop() {
  const { players, imposterIdxs, wordPair, resetGame } = useGameStore();
  const [votes, setVotes] = useState({});
  const [stage, setStage] = useState('voting'); // 'voting' or 'results'

  const castVote = (id) => {
    setVotes(v => ({ ...v, [id]: (v[id] || 0) + 1 }));
  };

  const getWinner = () => {
    // Basic logic: If most voted player is in imposterIdxs, Civilians win
    return "CALCULATING..."; 
  };

  return (
    <div className="game-loop">
      {stage === 'voting' ? (
        <>
          <h2>CAST YOUR VOTES</h2>
          {players.map(p => (
            <button key={p.id} onClick={() => castVote(p.id)}>Vote {p.name} ({votes[p.id] || 0})</button>
          ))}
          <button className="btn-primary" onClick={() => setStage('results')}>FINALIZE</button>
        </>
      ) : (
        <div className="results">
          <h1>{getWinner()}</h1>
          <p>The Word Was: {wordPair.en}</p>
          <button className="btn-primary" onClick={resetGame}>PLAY AGAIN</button>
        </div>
      )}
    </div>
  );
}