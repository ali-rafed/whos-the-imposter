import React, {useState, useEffect } from 'react'; // 1. Add useEffect
import { useGameStore } from './useGameStore';
import './App.scss'
// Global Layout
import Navbar from './Navbar';
import AdComponent from './AdComponent';
// Pages only
import Home from './Home';
import Setup from './Setup';
import Briefing from './Briefing';
import Interrogation from './Interrogation';
import Tribunal from './Tribunal';
// ... import your other components

function App() {
  const { currentPage } = useGameStore();
// 2. Add this effect to handle scrolling
useEffect(() => {
  window.scrollTo(0, 0);
}, [currentPage]); // Every time the page name changes, scroll to top
const [isReady, setIsReady] = useState(false);
  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home />;
      case 'setup': return <Setup />;
      case 'briefing':      return <Briefing />;
      case 'interrogation': return <Interrogation />;
      case 'tribunal':      return <Tribunal />;
      default:              return <Home />;
    }
  };
// Wait for the store to load from localStorage
  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return null; // Or a loading spinner
  return (
    
    <div  className="app-container">
      {/* 1. The visual overlay from your HTML */}
      <div className="scanlines7" />
      
      <Navbar />

      {/* 2. The centered page shell from your design */}
      <main className='page'>
        {renderPage()} 
      </main>

      {/* 3. Global Ad Slot footer as seen in your file */}
         <AdComponent key={currentPage} />

    </div>
  );
}

export default App;