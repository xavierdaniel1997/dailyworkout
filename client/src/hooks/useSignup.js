import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const resposne = await fetch('https://api-dailyworkout.onrender.com/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await resposne.json()

        if(!resposne.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if(resposne.ok) {
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({type:'LOGIN' ,payload: json})
            setIsLoading(false)
        }
    }
    return {signup, isLoading, error}
}