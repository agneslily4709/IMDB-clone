import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie"
const AuthContext = createContext(null)

const AuthDataContext = ({children}) => {

        const [userState,setUserState]  = useState(false)  
        const [userRole,setUserRole] = useState("")
        useEffect(()=>{
                if(Cookies.get("jwtoken")) setUserState(true)
                if(Cookies.get("userRole")) setUserRole(atob(Cookies.get("userRole")))
        },[])
        const data = {
                name:"Agnes Lily",
                userState,
                setUserState,
                userRole
        }
        return (
                <AuthContext.Provider value={data}>
                        {children}
                </AuthContext.Provider>
        )
}
export {AuthContext,AuthDataContext}