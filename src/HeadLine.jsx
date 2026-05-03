import { useGameStore } from './useGameStore';
function HeadLine({lang}) {
    const { currentPage} = useGameStore();
const t = {
    en: { 
        pTag:'STEP 01 — ROSTER',pTitle:'AGENT ROSTER',
        roTag:'STEP 02 — BRIEFING',roTitle:'ROLE ASSIGNMENT',
        qTag:'STEP 03 — INTERROGATION',qTitle:'QUESTION ROUNDS',
        vTag:'STEP 04 — TRIBUNAL',vTitle:'CAST YOUR VOTE',
    },
    ar: { 
        pTag:'خطوة ١ — قائمة اللاعبين',pTitle:'قائمة العملاء',
        // pSub:'أضف جميع اللاعبين. الحد الأدنى ٣.',
        roTag:'خطوة ٢ — الإحاطة',roTitle:'تعيين الأدوار',
        qTag:'خطوة ٣ — الاستجواب',qTitle:'جولات الأسئلة',
        vTag:'خطوة ٤ — المحكمة',vTitle:'أدلِ بصوتك',
}};
const switchPage=()=>{
    switch (currentPage) {
        case 'setup': return 'p' ;
        case 'briefing': return 'ro' ;
        case 'interrogation': return 'q' ;
        case 'tribunal': return 'v' ;
        default : "false"       
}
}

        return (
            <div>
                <div className="page-tag" id="ro-tag">{t[lang][`${switchPage()}Tag`]}</div>
                <h2 id="ro-title">{t[lang][`${switchPage()}Title`]}</h2>
            </div>
        )
}

export default HeadLine;