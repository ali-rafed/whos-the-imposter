import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
export const useGameStore = create(
  persist(
    (set) => ({
      // --- STATE ---
      // lang: 'en',
      players: [],
      imposterIdxs: [],
      wordPair: { en: '', ar: '' }, 
      gmMode: false,
      gmName: 'Game Master',
      numImposters: 1,
      currentPage: 'home',
      isBriefingStarted: false, // Reset this too!

      // --- ACTIONS ---
      // setLang: (lang) => set({ lang }),
      
      setPage: (page) => set({ currentPage: page }),

      addPlayer: (name) => set((state) => ({ 
        players: [...state.players, { name, id: `${Date.now()}-${Math.random()}`}] 
      })),

      removePlayer: (id) => set((state) => ({ 
        players: state.players.filter(p => p.id !== id) 
      })),

      updatePlayerName: (id, newName) => set((state) => ({
        players: state.players.map((p) => 
          p.id === id ? { ...p, name: newName } : p
        )
      })),

      setNumImposters: (val) => set({ numImposters: val }),

      // The "Swiss Army Knife" for updating multiple settings
      setGameSettings: (newSettings) => set((state) => ({ 
        ...state,        
        ...newSettings    
      })),

      setGmMode: (val) => set({ gmMode: val }),

      // Inside your resetGame action
resetGame: () => set({ 
  imposterIdxs: [], 
  wordPair: { en: '', ar: '' }, 
  currentPage: 'home',
  isBriefingStarted: false // Reset this too!
}),
// // Add or update this action in your store
// reshuffleGame: () => set((state) => {
//   const players = state.players;
//   const numImposters = state.numImposters;

//   // 1. Pick new random imposter(s)
//   const indices = players.map((_, i) => i);
//   const newImposters = [];
//   for (let i = 0; i < numImposters; i++) {
//     const randomIdx = Math.floor(Math.random() * indices.length);
//     newImposters.push(indices.splice(randomIdx, 1)[0]);
//   }

//   // 2. Pick a new random word (assuming you have a words array)
//   // const newWord = getRandomWord(); 

//   return {
//     imposterIdxs: newImposters,
//     // wordPair: newWord,
//     isBriefingStarted: false, // Reset this so the GM starts fresh
//     // We don't set the page here, we'll do it in the component
//   };
// }),
    }),
    {
      name: 'who-is-imposter-storage', // unique name for the item in storage
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);