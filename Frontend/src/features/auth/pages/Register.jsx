import React,{useState}from 'react'
import {useNavigate,Link} from 'react-router'
import {useAuth} from "../hooks/useAuth"



const Register = () => {
    const navigate = useNavigate()
    const {username,setUsername}=useState("")
    const {email,setEmail}=useState("")
    const {password,setpassword}=useState("")

    const {loading,handleRegister} = useAuth()
    
    const handlesubmit=async(e)=>{
        e.preventDefault()
        await handleRegister({username,email,password})
        navigate('/')

    }
    if(loading){
        return(<main><h1>Loading..........</h1></main>)
    }
  return (
    
<main>
        <div className="form-container">
            <h1>Register</h1>

            <form onSubmit={handlesubmit}>
                <div className="input-group">
                    <label htmlFor="email">UserName</label>
                    <input 
                    onChange={(e)=>{setUsername(e.target.value)}}
                    type="UserName" id='UserName' name='UserName' placeholder='Enter your UserName here ' />
                    
                    </div>
                  <div className="input-group">
                    <label htmlFor="password">Email</label>
                    <input onChange={(e)=>{setEmail(e.target.value)}}
                type="email" id='email' name='email' placeholder='Enter your Email here ' />
                    </div>


                    <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={(e)=>{setpassword(e.target.value)}}
                     type="password" id='password' name='password' placeholder='Enter your password here ' />
                    </div>

                    <button className='button primary-button'>
                        Register
                    </button>
            </form>

            <p>Already have an Account?<Link  to={"/login"} >Login</Link></p>
        </div>
    </main>
  )
}

export default Register
