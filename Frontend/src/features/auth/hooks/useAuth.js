import{useContext} from "react";
import {AuthContext} from "../auth.context.jsx"
import {login,register,logout,getme} from "../services/auth.api.js"

export const useAuth=()=>{
    const context = useContext(AuthContext)
    const{user,setuser,loading,setloading} = context
    
    

    const handleLogin = async ({email,password})=>{
        setloading(true)
      try {
          const data =  await login({email,password})
        setuser(data.user)
      } catch (error) {
          
      }finally{
        setloading(false)
      }
        
    }
 
 
    const handleRegister = async ({username,email,password})=>{
        setloading(true)
        try {
        const data = await register({username,email,password})
        setuser(data.user)
        } catch (error) {
            
        }finally{
            setloading(false)
        }
    }

    const handleLogout = async ()=>{
        setloading(true)
        const data = await logout()
        setuser(null)
        setloading(false)
    }

    return {user,loading,handleLogin,handleRegister,handleLogout}
}