import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import {AuthContext } from '../store/Auth';

const Login = () => {

    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const submitHandler =(e)=>{


            e.preventDefault();

            try {
                const sendData = async (email,password) => {
                    const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDqssr-XYkQE5aR15B7bVhhygLUnqGrHbc", {
                        method: "POST",
                        body: JSON.stringify({
                            email: email,
                            password: password,
                            returnSecureToken: true
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
    
                    const data = await response.json();
    
                    // console.log(data.idToken);

                    if(response.ok){
                        navigate("/dashboard")
                        console.log(data.email,data.idToken)
                       authCtx.login(data.email,data.idToken)
                    }
    
    
                }
    
                sendData(email.current.value,password.current.value);
            } catch (error) {
                console.error("ERROR", error)
            }

            

    }
  return (
    <div>
      <h2>Login </h2>
      <form onSubmit={submitHandler}>
        <label> Email
            <input type='email' ref={email} placeholder='Enter your Email' required />
        </label>
        <label> Password
            <input type='password' ref={password} placeholder='Enter your password' required />
        </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Login;
