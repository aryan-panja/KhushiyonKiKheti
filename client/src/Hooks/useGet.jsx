import { useQuery } from "@tanstack/react-query"
import {Url} from "../../../url"
export default function useGet( theUrl , token) {

    const url = Url.serverUrl + theUrl
    return useQuery({
        queryKey: ['repoData'],
        queryFn: async () => {
            const response = await fetch(url, {
                headers: {
                    'content-type': 'application/json',
                    'headers': `Bearer ${token}`
                }
            });
            return await response.json();
        }
    })
}