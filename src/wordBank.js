// src/utils/wordBank.js
 export const wordPairs = [
    { en: "Coffee", ar: "قهوة" },
    { en: "Restaurant", ar: "مطعم" },
    { en: "Space", ar: "فضاء" },
    { en: "Submarine", ar: "غواصة" },
    // Add as many as you want here!
  ];
  
  export const getRandomWord = () => {
    return wordPairs[Math.floor(Math.random() * wordPairs.length)];
  };
  