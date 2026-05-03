import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LangProvider } from './useLang'; // 1. Import your provider
import './main.scss'; 

import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New update available. Reload?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('Game is ready to work offline!');
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Wrap App with LangProvider */}
    <LangProvider>
      <App />
    </LangProvider>
  </React.StrictMode>
);