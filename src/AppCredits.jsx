import React from 'react';
import "./appCredits.scss"
const AppCredits = () => {
  return (
    <footer className='credits-container '>
      <p className='credit-label' >RESOURCES & LICENSING</p>
      
      <a 
        href="https://www.flaticon.com/" 
        target="_blank" 
        rel="noopener noreferrer"
        className='credit-link '
      >
        Icon made by Freepik from www.flaticon.com
      </a>
    </footer>
  );
};



// Added a hover effect simulation logic is cleaner in CSS files, 
// but this works for a single-file component!
export default AppCredits;