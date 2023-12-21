import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie"
const AuthContext = createContext(null)

const AuthDataContext = ({children}) => {

        const [userState,setUserState]  = useState(false)  
        useEffect(()=>{
                if(Cookies.get("jwtoken")) setUserState(true)
        },[])
        const data = {
                name:"Agnes Lily",
                userState,
                setUserState
        }
        return (
                <AuthContext.Provider value={data}>
                        {children}
                </AuthContext.Provider>
        )
}
export {AuthContext,AuthDataContext}