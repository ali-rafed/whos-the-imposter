import { useContext ,createContext ,useState} from "react"

const langContext=createContext()

export const LangProvider=({children})=>{
  const [lang , setLang]=useState("en")
    function toggleLang(){
      setLang(preValue => preValue==="en"? "ar" :"en")
    }
      
  return (<>
      <langContext.Provider value={{lang , toggleLang}}>
      <div dir={lang=== "en" ? "ltr": "rtl"} >
        {children}
      </div>
      </langContext.Provider>
  </>)
}

export const useLang=()=> useContext(langContext)