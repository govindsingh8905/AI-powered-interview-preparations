import axios from "axios"

const api =axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export async function register(username,email,password){
 try{
      const reponse= await api.post('/api/auth/register',{
        username,email,password
 })
    return reponse.data
 }catch(err){
    console.log(err)
 } 
}


export async function login ({email,password}){
     try{
      const reponse= await api.post('/api/auth/login',{
        email,password
    },)
    return reponse.data
 }catch(err){
    console.log(err)
 } 
}


export async function logout(){
    try {
        const reponse = await api.get("/api/auth/logout")
        return reponse.data
        
    } catch (error) {
        console.log(err)
        
    }
}

export async function getme(){
    try {
        const reponse = await api.get("/api/auth/get-me"
        )
         return reponse.data

    } catch (error) {
        console.log(err)
        
    }
}

