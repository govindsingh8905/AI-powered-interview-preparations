import React from 'react'
import {useNavigate,Link} from 'react-router'


const Register = () => {
    const navigate = useNavigate()
    const handlesubmit=(e)=>{
        e.preventDefault()
    }
  return (
    
<main>
        <div className="form-container">
            <h1>Register</h1>

            <form onSubmit={handlesubmit}>
                <div className="input-group">
                    <label htmlFor="email">UserName</label>
                    <input type="UserName" id='UserName' name='UserName' placeholder='Enter your UserName here ' />


                </div>
                  <div className="input-group">
                    <label htmlFor="password">Email</label>
                    <input type="email" id='email' name='email' placeholder='Enter your Email here ' />
                    </div>


                    <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' name='password' placeholder='Enter your password here ' />
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
