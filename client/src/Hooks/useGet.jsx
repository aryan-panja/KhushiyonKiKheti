import { useQuery } from "@tanstack/react-query"
import Url from "../../../url"
import useUserContext from "./useUserContext";
export default async function useGet( theUrl ) {

    const {token} = useUserContext()
    const url = Url.serverUrl + theUrl
    const response = await fetch(url , {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    });
    const json = await response.json();
    return { response , json }
}
