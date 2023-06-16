import DefaultLayout from "../layout/DefaultLayout"
import {useState} from "react"
import {useAuth} from "../auth/AuthProvider"
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constanst";
import type { AuthResponseError } from "../types/types";

export default function Signup(){
    
    const [name,setName] = useState("")
    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [errorResponse,setErrorResponse] = useState("")
    const goTo = useNavigate()
    const authContext = useAuth()
    if(authContext.isAuthenticated){
        return <Navigate to="/dashboard"/>
    }

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {e.preventDefault()
    
        try{
            const response = await fetch(`${API_URL}/signup`, {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({name,username,password})
            })
            if(response.ok){
                console.log("User created succesfully")
                setErrorResponse("")
                goTo("/")

            }else{
                console.log("Something went wrong")
                const json = (await response.json()) as AuthResponseError
                setErrorResponse(json.body.error)
                return
            }
            }
        catch(error){
            console.log(error)
        }
    }

    return (
        <DefaultLayout>
        <form className="form" onSubmit={handleSubmit}>
        <h1>Signup</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}

        <label>Name</label>
        <input type="text" value={name} onChange={e=>{setName(e.target.value)}}/>

        <label>Username</label>
        <input type="text" value={username} onChange={e=>{setUserName(e.target.value)}}/>

        <label>Password</label>
        <input type="password" value={password} onChange={e=>{setPassword(e.target.value)}}/>

        <button>Create user</button>
        </form>
        </DefaultLayout>
    )
}