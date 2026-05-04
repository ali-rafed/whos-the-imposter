import { useState } from "react";
import "./roleCard.scss"
import { useGameStore } from "./useGameStore";
import { useLang } from "./useLang";
export function RoleCard({ players, secretWord, isImposter  }) {
  const {setGameSettings}=useGameStore()
  const {lang}=useLang()
    const [revealed, setRevealed] = useState(false);
    const [index,setIndex]=useState(0)
    const  nextRoleRevea=()=>{
      if (index < players.length ) {
        setIndex(pre=> pre+1)
        setRevealed(false)
      }
    }
      const t = {
    en: { 
      roInstruct:'Pass the device to each agent. Tap the card to reveal your role — alone.',
    roRevealBtn:'TAP TO REVEAL YOUR ROLE',roHideBtn:'HIDE & PASS DEVICE',
    roWordLabel:'YOUR WORD',roImpLabel:'IMPOSTER',roImpSub:'You have no word. Bluff carefully.',
    roPassAlert:n=>`Pass device to: ${n}`,pBack:'← BACK',
    roAllDoneBtn:'ALL BRIEFED  BEGIN',arrowForward:" →"
    },
    ar: { 
      roInstruct:'مرّر الجهاز لكل عميل. اضغط للكشف عن دورك — بمفردك.',
      roRevealBtn:'اضغط للكشف عن دورك',roHideBtn:'أخفِ ومرّر الجهاز',
      roWordLabel:'كلمتك السرية',roImpLabel:'العميل السري',roImpSub:'لا كلمة لك. تصرّف بحذر.',
      roPassAlert:n=>`مرّر الجهاز إلى: ${n}`,pBack:'→ رجوع',
      roAllDoneBtn:'الجميع جاهز — ابدأ  ',arrowForward:" ←"
  }
}

    return (
      <>
      

<div id="role-area">
      { (index !== players.length ) ?
      <>
      <div className="alert alert-info">{t[lang].roPassAlert(players[index].name)}</div>
    <p className="sub">{t[lang].roInstruct}</p>
    <div className="role-reveal">
        { isImposter.includes(index) ?
      <div className={`role-card role-imposter ${revealed ? "" : "hidd"}` }
      id="role-card" onClick={()=> setRevealed(true)}>
        <div className="word">{t[lang].roImpLabel}</div>
          <div className="role-label">{t[lang].roImpSub}</div>
      </div>
        :
      <div className={`role-card ${revealed ? "" : "hidd"}` }
          id="role-card" onClick={()=> setRevealed(true)}> 
          <div className="word">{secretWord[lang]}</div>
          <div className="role-label">{t[lang].roWordLabel}</div>
      </div>
        }

      {!revealed ?
        <p className="sub mt12" id="role-hint" style={{fontSize:"clamp('11px','1.8vw','13px')"}}>{t[lang].roRevealBtn}</p>
        :
      <button className="btn btn-outline mt12 " id="role-hide-btn" onClick={()=>nextRoleRevea()}>{t[lang].roHideBtn}</button>
      }
    </div>
      </>:
      <div className="text-center mt24">
      <p className="alert alert-info mb16" style={{ fontWeight: lang === "ar" ? "bold" : "normal" }}>{t[lang].roAllDoneBtn}</p>
      <button className="btn btn-primary"
        onClick={() => setGameSettings({ currentPage: 'interrogation' })}
      >{`${t[lang].roAllDoneBtn} ${t[lang].arrowForward}`}</button>
      </div>

      }
    </div>

  
      </>
    );
  }

  export default RoleCard