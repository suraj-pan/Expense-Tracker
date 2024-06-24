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
        <div className='flex flex-col justify-center items-center min-h-screen'>
        <h2 className='text-2xl text-center font-bold mb-5'>Sign-Up</h2>
        <form className='w-full max-w-md border border-black rounded-md px-4 py-6 bg-gray-100' onSubmit={submitHandler}>
          <label className='block mb-3'>
            E-mail:
            <input
              type='email'
              ref={email}
              placeholder='Enter your email'
              className='border border-gray-300 rounded-md p-2 mt-1 w-full focus:outline-none'
              required
            />
          </label>
          <label className='block mb-3'>
            Password:
            <input
              type='password'
              ref={password}
              placeholder='Enter your password'
              className='border border-gray-300 rounded-md p-2 mt-1 w-full focus:outline-none'
              required
            />
          </label>
          <label className='block mb-3'>
            Confirm Password:
            <input
              type='password'
              ref={confirmPassword}
              placeholder='Enter your confirm password'
              className='border border-gray-300 rounded-md p-2 mt-1 w-full focus:outline-none'
              required
            />
          </label>
          <button
            type='submit'
            className='bg-blue-500 text-white rounded-md p-2 mt-4 w-full cursor-pointer hover:bg-blue-600 focus:outline-none'
          >
            Submit
          </button>
        </form>
      </div>
      
    
    )
}

export default SignUp
