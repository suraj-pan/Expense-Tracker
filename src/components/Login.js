import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/AuthSlice';

const Login = () => {

    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    // const authCtx = useContext(AuthContext);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
    const token = useSelector(state=>state.auth.token);

   

    console.log(isLoggedIn,token)

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
                        let idToken = data.idToken;
                        let email = data.email;
                    //    authCtx.login(data.email,data.idToken)
                    dispatch(login({idToken,email}))
                    }
    
    
                }
    
                sendData(email.current.value,password.current.value);
            } catch (error) {
                console.error("ERROR", error)
            }

            

    }

    const forgetPasswordHandler =()=>{
        navigate("/forgetPage")
    }


    
  return (
    <div className="flex flex-col  items-center justify-center h-screen ">
    <h2 className='text-2xl mb-3 font-semibold text-blue-900'>Login</h2>
    <form onSubmit={submitHandler} className=" max-w-md bg-white p-8 rounded-md shadow-md">
        <div className="flex flex-col">
            <label className="mb-1 text-blue-300">Email</label>
            <input
                type="email"
                ref={email}
                placeholder="Enter your Email"
                className="border border-gray-300 rounded-md p-2 w-[300px]"
                required
            />
        </div>
        <div className="flex flex-col">
            <label className=" text-sm text-blue-300">Password</label>
            <input
                type="password"
                ref={password}
                placeholder="Enter your password"
                className="border border-gray-300 rounded-md p-2 w-[300px]"
                required
            />
        </div>
    <div className='flex flex-col justify-between'>
    <button
            type="button"
            onClick={forgetPasswordHandler}
            className="text-blue-500 hover:underline focus:outline-none"
        >
            Forgot password?
        </button>
        <button
            type="submit"
            className="bg-blue-500 mt-3 text-white rounded-md p-2 hover:bg-blue-600 focus:outline-none"
        >
            Submit
        </button>
    </div>
    </form>
</div>


  )
}

export default Login;
