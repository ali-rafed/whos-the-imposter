import React, { useState } from 'react';
import { useGameStore } from './useGameStore';
import { useLang } from './useLang';
import './GMPanel.scss';

export const GMPanel = ({ wordPairs = [], onConfirm }) => {
  const { players, numImposters ,
    setGameSettings // This is used to toggle the mode
  } = useGameStore();
  const { lang } = useLang();

  const [selectedWordIdx, setSelectedWordIdx] = useState("0");
  const [customWord, setCustomWord] = useState("");
  const [imposterIdxs, setImposterIdxs] = useState([]);

  if (!wordPairs || wordPairs.length === 0) return <div>Loading Words...</div>;
  const t = {
    en: { 
      
      pMinAlert:`Need at least ${numImposters} agents to begin.`,
      gmPanelLabel:'GAME MASTER CONTROLS',
    gmWordLabel:'SELECT SECRET WORD',gmWordCustom:'Custom word...',
    gmImpLabel:`SELECT ${numImposters} IMPOSTER(S)`,gmImpHint:`Pick exactly ${numImposters} player(s) as the imposter`,
    gmConfirm:'CONFIRM & START BRIEFING →',pBack:'← BACK'
    },
    ar: { 
      
      pMinAlert:`تحتاج  ${numImposters} عملاء على الأقل للبدء.`,
      gmPanelLabel:'لوحة تحكم المدير',
    gmWordLabel:'اختر الكلمة السرية',gmWordCustom:'كلمة مخصصة...',
    gmImpLabel:`اختر ${numImposters} عملاء سريون  `,gmImpHint:`اختر ${numImposters} لاعبين كعملاء سريون`,
    gmConfirm:'تأكيد وبدء  ←',pBack:'→ رجوع'
  }
  };
  const toggleImp = (idx) => {
    if (imposterIdxs.includes(idx)) {
      setImposterIdxs(imposterIdxs.filter(i => i !== idx));
    } else if (imposterIdxs.length < numImposters) {
      setImposterIdxs([...imposterIdxs, idx]);
    }
  };

  const handleConfirm = () => {
    // 1. Validation check
    if (imposterIdxs.length !== numImposters) {
      alert(t[lang].pMinAlert);
      return;
    }
    
    // 2. Prepare the Word Pair object
    let selectedWordPair;
    
    if (selectedWordIdx === 'custom') {
      // If custom, we set the same word for both languages
      selectedWordPair = { en: customWord, ar: customWord };
    } else {
      // If from bank, get the object from your wordPairs array
      selectedWordPair = wordPairs[parseInt(selectedWordIdx)];
    }

    // 3. Send data back to Briefing.jsx
    onConfirm(selectedWordPair, imposterIdxs);
  };
  return ( <>
<div  id="page-roles">


<div id="role-area">
  <div className="gm-panel">
    <div className="gm-label">{t[lang].gmPanelLabel}</div>
    <div className="gm-select-row">
      <div><label>{t[lang].gmWordLabel}</label>
      <select id="gm-word-sel" 
              value={selectedWordIdx}
              onChange={(e) => setSelectedWordIdx(e.target.value)}>
              {wordPairs.map((pair, index) => (
                
                <option key={index} value={index}>{pair[lang]}</option>
              ))}
              <option value="custom">{t[lang].gmWordCustom}</option>
      </select>
      {selectedWordIdx === 'custom' && (
          <div id="gm-custom-row" className="mb16">
            <input 
            autoFocus
              type="text" 
              id="gm-custom-word" 
              placeholder="Custom word..." 
              style={{ marginTop: '6px' }}
              value={customWord}
              onChange={(e) => setCustomWord(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
    <div id="gm-custom-row" className="hidden mb16">
      <input type="text" id="gm-custom-word" placeholder={t[lang].gmWordCustom} style={{marginTop:'6px'}}/>
    </div>
    <div className="gm-label mt16" style={{marginTop:'14px'}}>{t[lang].gmImpLabel}</div>
    <p className="sub" style={{fontSize:'clamp(10px,1.8vw,12px)', marginBottom:'10px'}}>
    {t[lang].gmImpHint}</p>
    <div className="gm-player-list">
    {players.map((player, idx) => (
    <button 
      key={player.id}
      // Check if this player index is in the selected imposter list
      className={`gm-player-btn ${imposterIdxs.includes(idx) ? 'active' : ''}`}
      onClick={() => toggleImp(idx)}
    >
      {player.name}
    </button>
  ))}
    </div>
    <div id="gm-imp-count" className={`badge ${imposterIdxs.length ===  numImposters? "badge-accent" : "badge-red"}`} style={{marginBottom:'14px'}}>
    {imposterIdxs.length} / {numImposters} selected</div>
<div className='flex gap8 flex-wrap'>
<button className="btn btn-outline" onClick={() => setGameSettings({ currentPage: 'setup' })}>
{t[lang].pBack}
  </button>
    <button className="btn btn-primary" onClick={handleConfirm}>{t[lang].gmConfirm}</button>
</div>
  </div>
  </div>


</div>
  
  </>
  );
};