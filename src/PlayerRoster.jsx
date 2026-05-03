import React, { useState } from 'react';
import { useGameStore } from './useGameStore';
import   './PlayerRoster.scss';

const PlayerRoster = () => {
  const { players, addPlayer, removePlayer, setPage, lang } = useGameStore();
  const [nameInp, setNameInp] = useState('');

  const handleAdd = () => {
    if (nameInp.trim()) {
      addPlayer(nameInp.trim());
      setNameInp('');
    }
  };

  return (
    <div className={'container'}>
      <h2 className={'title'}>{lang === 'en' ? 'AGENT ROSTER' : 'قائمة العملاء'}</h2>
      <div className={'inputRow'}>
        <input 
          type="text" 
          value={nameInp}
          onChange={(e) => setNameInp(e.target.value)}
          placeholder="Agent codename..."
        />
        <button className="btn-primary" onClick={handleAdd}>ADD</button>
      </div>

      <div className={list}>
        {players.map((p) => (
          <div key={p.id} className={'playerItem'}>
            <span>{p.name}</span>
            <button onClick={() => removePlayer(p.id)}>✕</button>
          </div>
        ))}
      </div>

      <button 
        className="btn-primary full-width"
        disabled={players.length < 3}
        onClick={() => setPage('roles')}
      >
        NEXT: ASSIGN ROLES →
      </button>
    </div>
  );
};

export default PlayerRoster;