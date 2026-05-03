import React, { useState } from 'react';
import { useGameStore } from './useGameStore';
import { getRandomWord } from './wordBank';
import {useLang} from "./useLang"
import "./setup.scss";
import HeadLine from './HeadLine';

export default function Setup() {
  const { 
    players, gmName,
    addPlayer, 
    removePlayer, 
    updatePlayerName,
    setGameSettings, // This is used to toggle the mode
    numImposters, 
    setNumImposters,
    gmMode
  } = useGameStore();
  
  const {lang} = useLang();
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Logic: Max 1 for 3-4 players, 2 for 5-6, 3 for 7+
  const maxAllowed = Math.max(1, Math.floor(players.length / 3));
  const options = [1, 2, 3];
  const t = {
    en: { 
      editBtn:'✏️',delBtn:'✕',saveBtn:'✓',
      pSub:'Add all players. Minimum 3 agents required.',
      pPlaceholder:'Agent codename...',pAddBtn:'ADD',pBack:'← BACK',pNext:'NEXT: ASSIGN ROLES →',
      pCount:'AGENTS',sepSettings:'OPERATION SETTINGS',
      slImp:'IMPOSTERS',slGm:'GAME MASTER',gmToggleOff:'Disabled',gmToggleOn:'Enabled',
      slGmname:'GAME MASTER NAME',gmPlaceholder:'Who is the GM? (Player or Outsider)',
      gmSub:'The GM will see all secrets.',
      pMinAlert:'Need at least 3 agents to begin.',
    },
    ar: { 
      editBtn:'✏️',delBtn:'✕',saveBtn:'✓',
      pSub:'أضف جميع اللاعبين. الحد الأدنى ٣.',
      pPlaceholder:'اسم العميل...',pAddBtn:'إضافة',pBack:'→ رجوع',pNext:'التالي: تعيين الأدوار ←',
      pCount:'عملاء',sepSettings:'إعدادات العملية',
      slImp:'المزدوجون',slGm:'مدير اللعبة',gmToggleOff:'معطّل',gmToggleOn:'مفعّل',
      slGmname:'اسم مدير اللعبة',gmPlaceholder:'من هو سيد اللعبة؟',
      gmSub:'سيد اللعبة سيرى كل الأسرار.',
      pMinAlert:'تحتاج ٣ عملاء على الأقل للبدء.',
  }
  };
  function submitName(event) {
    event.preventDefault();
    
    if (name.trim() !== '') {
      console.log(name);
      addPlayer(name);
      setName('');
    }
  }
  const handleSave = (id) => {
    if (editValue.trim() !== "") {
      updatePlayerName(id, editValue); // Update Zustand Store
      setEditingId(null); // Exit edit mode
    }
  };
  const handleStartGame = () => {
    const selectedWord = getRandomWord();
    let indices = players.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const imposterIdxs = indices.slice(0, numImposters);
    console.log(numImposters);
    setGameSettings({
      wordPair: selectedWord,
      imposterIdxs: imposterIdxs,
      currentPage: 'briefing',
      isBriefingStarted: true // Auto mode goes straight to reveal
    });
  };

  return (

    <div  id="page-players">


  <HeadLine lang={lang}/>
  <p className="sub" id="p-sub">{t[lang].pSub}</p>
  <form onSubmit={submitName} className="input-row">
    <input type="text" id="player-input" placeholder={t[lang].pPlaceholder}
    value={name} onChange={(e) => setName(e.target.value)}

     />
    <button type='submit' className="btn btn-primary" 
    id="p-add-btn">{t[lang].pAddBtn}</button>
  </form>
  <div id="player-list">
  {players.map((p, i) => (
    <div key={p.id} className="player-item">
      {editingId === p.id ? (
        /* --- EDIT MODE --- */
        <>
          <span className="num">{i + 1}.</span>
          <input 
          id="edit-input"
            className="edit-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave(p.id);
              if (e.key === 'Escape') setEditingId(null);
            }}
            autoFocus
          />
          <div className="actions">
            <button 
              className="btn btn-sm btn-primary" 
              onClick={() => handleSave(p.id)}
            >
              {t[lang].saveBtn}
            </button>
          </div>
        </>
      ) : (
        /* --- DISPLAY MODE --- */
        <>
          <span className="num">{i + 1}.</span>
          <span className="pname">{p.name}</span>
          <div className="actions">
            <button 
              className="btn btn-ghost btn-sm" 
              onClick={() => {
                setEditingId(p.id);
                setEditValue(p.name); // Pre-fill with current name
              }}
            >
              {t[lang].editBtn}
            </button>
            <button 
              className="btn btn-danger btn-sm"
              onClick={() => removePlayer(p.id)}
            >
              {t[lang].delBtn}
            </button>
          </div>
        </>
      )}
    </div>
  ))}
</div>
  <div className="mb16 mt8"><span className="badge badge-accent" id="p-count-badge">{players.length} {t[lang].pCount}</span></div>

  <div className="sep">
  <div className="sep-line">
  </div><div className="sep-text" id="sep-settings">{t[lang].sepSettings}</div>
  <div className="sep-line"></div>
  </div>

  <div className="settings-grid">
      {/* IMPOSTER SELECT */}
      {!gmMode && (
        <div className="setting-item">
        <div className="setting-label" id="sl-imp">{t[lang].slImp}</div>
        <div  className=" segmented-control" 
          id="imp-count-sel">
          {options.filter(num => num <= maxAllowed).map((num) => {
          const isDisabled = num > maxAllowed;
          const isActive = numImposters === num;
          {/* console.log(maxAllowed === numImposters) */}
          return (
            <button 
              key={num}
              type="button"
              disabled={isDisabled ? 'disabled' : ''}
              className={`segment-btn  ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
              onClick={() => setNumImposters(num)}
            >
              {num}
            </button>
          );
        })}
        </div>
      </div>
      )}

      {/* GAME MASTER TOGGLE */}
      <div className="setting-item">
        <div className="setting-label" id="sl-gm">{t[lang].slGm}</div>
        <div className="toggle-row">
          <span className="toggle-label" id="gm-toggle-label">
            {gmMode ? "Enabled" : "Disabled"}
          </span>
          <label className="toggle">
            <input 
              id="gm-toggle" 
              type="checkbox" 
              checked={gmMode} // Logic: uses 'checked' instead of 'value'
              onChange={(e) => setGameSettings({ gmMode: e.target.checked })}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>

    {/* Inside Setup.jsx, where the GM Toggle is */}
{gmMode && (
  <div id="gm-name-row" className="mb16 mt16">
    <div className="setting-label" id="sl-gmname">
      {t[lang].slGmname}
    </div>
    <input 
      type="text" 
      id="gm-name-input" 
      value={gmName}
      placeholder={t[lang].gmPlaceholder} 
      style={{ marginTop: "6px" }}
      // We can store this in gameSettings so the Briefing page knows who it is
      onChange={(e) => setGameSettings({ gmName: e.target.value })}
    />
    <p className="sub" style={{fontSize: '11px', marginTop: '4px'}}>
      {t[lang].gmSub}
    </p>
  </div>
)}

{/* ... Divider and Buttons ... */}

<div className="flex gap8 flex-wrap">
  <button className="btn btn-outline" onClick={() => setGameSettings({ currentPage: 'home' })}>
  {t[lang].pBack}
  </button>
  <button 
    className="btn btn-primary" 
    id="p-next"
    disabled={players.length < 3}
    onClick={() => {
    if(maxAllowed >= numImposters){
      if (gmMode) {

// Just go to briefing page; logic happens there
gmName!=="" && setGameSettings({ currentPage: 'briefing' });
} else {
// Auto-assign roles and then go to briefing
handleStartGame(); 
}
    }
    }}
  >
    {t[lang].pNext}
  </button>
</div>
</div>
  );
}