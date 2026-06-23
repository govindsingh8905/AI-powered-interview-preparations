import React,{useState} from 'react'
import "../auth.form.scss"
import {  useNavigate,Link } from "react-router"
import{useAuth} from '../hooks/useAuth'


 
const login = () => {
    const{ loading,handleLogin }=useAuth()
    const navigate=useNavigate()
   const [email,setEmail] = useState("");
    const[password,setPassword]=useState("");

    const handlesubmit= async(e)=>{
        e.preventDefault()
        await handleLogin({email,password})
        navigate('/')
    }

    if(loading){
        return(
          <main style={{ padding: '2rem' }}>
            <h1>Loading...</h1>
          </main>
        )
    }
  return (
    <main className="auth-page">
      <div className="auth-split">
        {/* ── Left: Form Panel ── */}
        <div className="auth-form-panel">
          <div className="form-container">
            <div className="form-header">
              <h1>Welcome</h1>
              <p className="form-subtitle">Continue your interview preparation journey</p>
            </div>

            <form onSubmit={handlesubmit}>
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input  onChange={(e)=>{setEmail(e.target.value)}}// two way binding
                type="email" id='email' name='email' placeholder='Enter your email address' />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <input onChange={(e)=>{setPassword(e.target.value)}}
                   type="password" id='password' name='password' placeholder='Enter your password' />
                  <span className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span className="custom-checkbox"></span>
                  Keep me signed in
                </label>
                <a href="#" className="reset-link">Reset password</a>
              </div>

              <button className='button primary-button'>
                Sign In
              </button>
            </form>

            <div className="divider">
              <span>Or continue with</span>
            </div>

            <button className="button social-button">
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Continue with Google
            </button>

            <p className="form-footer">Don't have an account? <Link to={"/register"}>Create Account</Link></p>
          </div>
        </div>

        {/* ── Right: Hero Panel ── */}
        <div className="auth-hero-panel">
          <div className="hero-gradient"></div>
        </div>
      </div>
    </main>
  )
}

export default login