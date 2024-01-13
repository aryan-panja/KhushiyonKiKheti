import Url from "../../../url"

export default async function usePost( theUrl , userData){
    
    const { token } = useUserContext();
    const url = Url.serverUrl + theUrl;
    const response = await fetch(url, {
        method : "POST",
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body : JSON.stringify(userData)
      });
      const json = await response.json()
  
      return {response , json}
}