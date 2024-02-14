import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        if (password.current.value !== confirmPassword.current.value) {
            alert("password does not match")
        }

        try {
            const sendData = async (email,password) => {
                const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDqssr-XYkQE5aR15B7bVhhygLUnqGrHbc", {
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

                console.log(data);

                if(response.ok){
                        navigate("/login")
                }    

            }

            sendData(email.current.value, password.current.value)
        } catch (error) {
            console.error("ERROR", error)
        }


    }

    return (
        <div className='flex flex-col justify-center items-center '>
            <h2 className='text-2xl text-center font-bold' >Sign-Up</h2>
            <form className='flex flex-col ' onSubmit={submitHandler}>
                <label>E-mail:
                    <input type='email' ref={email} placeholder='enter your email' required />
                </label>
                <label>Password:
                    <input type='password' ref={password} placeholder='enter your password' required />
                </label>
                <label>Confirm Password:
                    <input type='password' ref={confirmPassword} placeholder='enter your confirm password' required />
                </label>
                <button type='submit' >Submit</button>
            </form>
        </div>
    )
}

export default SignUp
