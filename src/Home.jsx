import React from 'react';
import { useGameStore } from './useGameStore';
import "./hero.scss"
import { useLang } from './useLang';
export default function Home() {
  const { setPage } = useGameStore();
  const {  lang } = useLang();
  const cardEx=[
      {id:'f1t' , icone:"🕵️",desc:"f1d"},
      {id:'f2t' , icone:"🎙️",desc:"f2d"},
      {id:'f3t' , icone:"🗳️",desc:"f3d"},
      {id:'f4t' , icone:"🎩",desc:"f4d"}
  ]
  const t = {
    en: { 
      hTag:'// CLASSIFIED OPERATION',hTitle1:"Who's The",hTitle2:'Imposter?',
    hSub:'A pass-and-play social deduction game. Everyone gets a secret word — except the moles. Find them before they escape .',
    f1t:'Hidden Moles',f1d:'One or more players get no word and must bluff.',
    f2t:'Question Rounds',f2d:'Players question each other. Listen for cracks.',
    f3t:'Vote & Reveal',f3d:'Vote for suspects. Majority decides the fate.',
    f4t:'Game Master',f4d:'Optional GM picks the word and moles manually.',
    hStart:'START MISSION →',hHint:'PASS DEVICE TO FIRST PLAYER'
  },
    ar: { 
    hTag:'// عملية سرية',hTitle1:'من هو ' ,hTitle2:'العميل المزدوج؟',
    hSub:'لعبة تمرير اجتماعية. الجميع يحصل على كلمة سرية — إلا العملاء المزدوجين. اكشفهم قبل أن يهربوا.',
    f1t:'عملاء مزدوجون',f1d:'لاعب أو أكثر لا يعرفون الكلمة، عليهم الإيهام.',
    f2t:'جولات الأسئلة',f2d:'اللاعبون يسألون بعضهم. استمع للتناقضات.',
    f3t:'تصويت وكشف',f3d:'صوّت للمشتبه بهم. الأغلبية تقرر.',
    f4t:'مدير اللعبة',f4d:'المدير الاختياري يختار الكلمة والعملاء المزدوجين.',
    hStart:'ابدأ المهمة ←',hHint:'مرّر الجهاز للاعب الأول'
  }
  };

  return (
<>
  <div className="hero">
  <div className="hero-tag" id="h-tag">{t[lang].hTag}</div>
    <h1 className="hero-title"><span id="h-title1">{t[lang].hTitle1}</span>
    <span className="accent" id="h-title2">{t[lang].hTitle2}</span></h1>
    <p className="hero-sub" id="h-sub">{t[lang].hSub}</p>
    <div className="feature-grid">

      {cardEx.map(card =>{
        return   (    <div key={card.id} className="feature-item">
      <div className="feature-icon">{card.icone}</div>
      <div className="feature-title" id={card.id}>{t[lang][card.id]}</div>
      <div className="feature-desc" id={card.desc}>{t[lang][card.desc]}</div>
      </div>)
      })

      }

    </div>
    <button onClick={() => setPage('setup')} className="btn btn-primary"  id="h-start">{t[lang].hStart}</button>
    <p className="scroll-hint mt16" id="h-hint">{t[lang].hHint}</p>
  </div>
</>
  );
}

