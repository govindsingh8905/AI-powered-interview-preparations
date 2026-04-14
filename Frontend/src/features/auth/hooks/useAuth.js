import {useContext,useEffect} from "react"
import {AuthContext} from "../auth.context"
import {login,register,logout,getMe} from "../services/auth.api.js"

export const useAuth=()=>{
    const context = useContext(AuthContext)
  const {user,setUser,loading,setLoading} = context // ye padhna h !!!!!!!!!!!!!!

  const handleLogin= async({email,password}) =>{
     setLoading(true)

    try {
        const data = await login({email,password})
   setUser(data.user)
        
    } catch (error) {
          console.log(error)
    }finally{
        setLoading(false)
    }
   
   

  }

  const handleRegister = async ({username,email,password})=>{
    setLoading(true)
    try {
        const data = await register({username,email,password})
    setUser(data.user)
        
    } catch (error) {
         console.log(error)
        
    }finally{
        setLoading(false)
    }
    
  
  }

  const handleLogout= async()=>{
    setLoading(true)
    const data = await logout()
    try {
         setUser(null)
        
    } catch (error) {
        console.log(error)
        
    }
    finally{
            setLoading(false)
    }
   

  }

useEffect(()=>{
    const getandsetUser= async()=>{
        const data = await getMe()
        setUser(data.user)
        setLoading(false)
    }

    getandsetUser()
   },[])


  return{user,loading,handleLogin,handleRegister,handleLogout}
}