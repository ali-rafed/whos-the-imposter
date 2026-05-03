// src/utils/wordBank.js
 export const wordPairs = [
    { en: "Coffee", ar: "قهوة" },
    {en:'Pizza',ar:'بيتزا'},{en:'Airport',ar:'مطار'},{en:'Football',ar:'كرة القدم'},
    {en:'Hospital',ar:'مستشفى'},{en:'Library',ar:'مكتبة'},{en:'Swimming Pool',ar:'حمام سباحة'},
    {en:'Supermarket',ar:'سوبر ماركت'},{en:'Cinema',ar:'سينما'},{en:'Desert Island',ar:'جزيرة نائية'},
    {en:'Submarine',ar:'غواصة'},{en:'Circus',ar:'سيرك'},{en:'Bank',ar:'بنك'},
    {en:'School',ar:'مدرسة'},{en:'Space Station',ar:'محطة فضائية'},{en:'Casino',ar:'كازينو'},
    {en:'Haunted House',ar:'بيت مسكون'},{en:'Train Station',ar:'محطة قطار'},{en:'Restaurant',ar:'مطعم'},
    {en:'Zoo',ar:'حديقة حيوان'},{en:'Museum',ar:'متحف'},{en:'Gym',ar:'صالة رياضية'},
    {en:'Beach',ar:'شاطئ'},{en:'Forest',ar:'غابة'},{en:'Laboratory',ar:'مختبر'},
    {en:'Prison',ar:'سجن'},{en:'Cruise Ship',ar:'سفينة سياحية'},{en:'Theatre',ar:'مسرح'},
    {en:'Farm',ar:'مزرعة'},{en:'Hotel',ar:'فندق'},{en:'Amusement Park',ar:'مدينة ملاهي'},
    // Add as many as you want here!
  ];
  
  export const getRandomWord = () => {
    return wordPairs[Math.floor(Math.random() * wordPairs.length)];
  };
  