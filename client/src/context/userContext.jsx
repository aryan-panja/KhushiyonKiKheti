
import { createContext , useEffect, useReducer } from "react";

export const userContext = createContext();

export function handleReducerHook(prevState , action){
    switch(action.type){
        case "LOGIN":
            console.log("login")
            return {...action.payload}
        case "LOGOUT":
            console.log('logout')
            return { user : null , token: null }
        default : 
            return prevState
    }
}

export function UserContextProvider({children}){
    const [state , dispatch ] = useReducer(handleReducerHook , {
        user : null,
        token : null
    })
    useEffect(()=>{
        const userData =JSON.parse(localStorage.getItem('USER'));
        if(userData){
            dispatch({type : "LOGIN" , payload:userData})
        } 
    },[])
    return(
        <userContext.Provider value={{...state , dispatch}}> 
            {children}
        </userContext.Provider>
        
    )
}