import React, { useState, useEffect } from 'react';
import { useGameStore } from './useGameStore';
import HeadLine from './HeadLine';
import { useLang } from './useLang';
import "./Interrogation.scss";

const Interrogation = () => {
  const { players, setGameSettings } = useGameStore();
  const { lang } = useLang();
  const [qPairs, setQPairs] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    // 1. Copy the players array so we don't mutate the store
    let shuffled = [...players];
    
    // 2. Shuffle the array randomly
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // 3. Create pairs where the target becomes the next asker
    const pairs = [];
    for (let i = 0; i < shuffled.length; i++) {
      let asker = shuffled[i];
      // The target is the next person in the shuffled list (loop to start at the end)
      let target = shuffled[(i + 1) % shuffled.length];
      
      pairs.push({ 
        asker: asker.name, 
        target: target.name 
      });
    }
    
    setQPairs(pairs);
  }, [players]);

  const isLast = currentIdx >= qPairs.length - 1;

  // Translation helpers
  const t = {
    en: { next: "NEXT PAIR →", vote: "GO TO VOTE", asks: "asks",arr:"←"},
    ar: { next: "الزوج التالي ←", vote: "ذهاب للتصويت", asks: "يسأل" ,arr:"→"}
  };

  return (
    <div className='page'>
      <HeadLine lang={lang} />
      
      <div className="interrogation-container">
        {qPairs[currentIdx] && (
          <>
            {/* The Current Pair Display */}
            <div className="q-pair card">
              <div className="q-asker">
                <span className="name-highlight">{qPairs[currentIdx].asker}</span> 
                {" "}{t[lang].asks}{" "}
                <span className="name-highlight">{qPairs[currentIdx].target}</span>
              </div>
            </div>

            <div className="alert alert-info mb16">
              {lang === 'ar' 
                ? "على السائل طرح سؤال ذكي للكشف عن الجاسوس دون فضح الكلمة!" 
                : "The asker must probe the target to find the imposter without giving away the word!"}
            </div>

            <div className="flex gap8 flex-wrap mt8">
            {currentIdx > 0 && <button class="btn btn-ghost" 
            onClick={()=>setCurrentIdx(currentIdx - 1)} >
            {t[lang].arr}
            </button>}
              <button 
                className="btn btn-primary" 
                onClick={() => isLast ? setGameSettings({currentPage: 'tribunal'}) : setCurrentIdx(currentIdx + 1)}
              >
                {isLast ? t[lang].vote : t[lang].next}
              </button>
              
              <span className="badge badge-accent" style={{alignSelf: "center"}}>
                {currentIdx + 1} / {qPairs.length}
              </span>
            </div>

            {/* Visual Progress: The Chain */}
            <div className="mt24 flex flex-wrap gap8">
              {qPairs.map((pair, i) => (
                <span 
                  key={i} 
                  className={`badge ${i === currentIdx ? 'badge-accent' : i <currentIdx ? "badge-green": ""}`}
                  style={{ opacity: i > currentIdx ? 0.4 : 1 }}
                >
                  {pair.asker} → {pair.target}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Interrogation;