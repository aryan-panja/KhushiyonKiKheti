
import { createContext , useEffect, useReducer } from "react";

export const userContext = createContext();

export function handleReducerHook(prevState , action){
    switch(action.type){
        case "LOGIN":
            console.log("login")
            return {...prevState , ...action.payload}
        case "LOGOUT":
            console.log('logout')
            return { user : null , token: null , location : prevState.location}
        case "setLocation":{
            console.log('location is set');
            console.log(action.payload);
            return { ...prevState , location : action.payload}
        }
        case "setTemperature":{
            console.log('temperature is set');
            console.log(action.payload);
            return { ...prevState , temperature : action.payload}
        }
        default : 
            return prevState
    }
}

export function UserContextProvider({children}){
    const [state , dispatch ] = useReducer(handleReducerHook , {
        user : null,
        token : null,
        location:{
            city : 'jalandhar',
            state : 'punjab',
            country : 'india'
        },
        temperature: 25
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