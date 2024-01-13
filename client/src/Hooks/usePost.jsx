import { useMutation } from "@tanstack/react-query"
import Url from "../../../url"

export default function usePost( theUrl , token ){

    const url = Url.serverUrl + theUrl;
    
    const mutation = useMutation(async (data)=>{
        const response = await fetch(url , {
            headers : {
                'content-type' : 'application/json',
                'authorization' : `Bearer ${token}`
            },
            body : JSON.stringify(data)
        });

        const json = response.json();

        if(!response.ok) throw Error("Error in usePost - response.ok = false");

        return json;
    });

    return mutation;
}