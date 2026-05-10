import React from 'react';
import { useGameStore } from './useGameStore';
import { useLang } from './useLang';
import AdComponent from './AdComponent';
// 1. Ensure the filename has .module
import "./Navbar.scss";

const Navbar = () => {
  const {  setPage, currentPage , resetGame} = useGameStore();
  const {  lang, toggleLang } = useLang();
  const steps =['setup', 'briefing', 'interrogation', 'tribunal'];
  function toggleHome(){
    resetGame()
    setPage('home')
  }
  console.log()
  return (
    <>
      <nav className='navbar'> 
        <span className='brand' onClick={() => toggleHome() }>
          {lang === 'en' ? "WHO'S THE IMPOSTER" : "من هو العميل السري؟"}
        </span>

        {/* --- ADDED AD SLOT --- */}
        {/* <AdComponent position='left' ></AdComponent> */}

        <div className='right'>

          <div className='dots'> 
            {steps.map((item , i) => (
              
              <div key={item} id={i}
               className=
               {`dot ${currentPage === item ? 'active' : ''} ${steps.indexOf(currentPage) > i ? 'done' : ''}`} />
            ))}
          </div>
          <button 
            className='btn langBtn'
            onClick={() => setPage('about')}
            
          >{lang !== 'en' ? 'عنا' : 'about us'}</button>
          <button className='langBtn' onClick={() => toggleLang()}>
            {lang === 'en' ? 'عربي' : 'English'}
          </button>
        </div>
      </nav>
    </>
  );
};
  export default Navbar;