import React, { useRef } from 'react'

const ForgetPage = () => {

        const email = useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        try {
            const sendData = async (email) => {
                const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDqssr-XYkQE5aR15B7bVhhygLUnqGrHbc", {
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        requestType: "PASSWORD_RESET",
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const data = await response.json();

                console.log(data);

               if(response.ok){
                    alert("check your mail box to change password")
               }else{
                alert("email is registered to our site")
               }




            }

            sendData(email.current.value);
        } catch (error) {
            console.error("ERROR", error)
        }
    }

    return (
        <div className='flex flex-col h-screen justify-center items-center '>
            <h3 className='text-3xl mb-2'>Forget Password Page to login to This expense Tracker</h3>
            <form onSubmit={submitHandler} className='flex flex-col items-center' >
                <label className='text-2xl mb-4 flex flex-col'>
                    Enter your E-mail to get a new password
                    <input type='text ' className='border border-gray-300 bg-gray-100' ref={email} />
                </label>
                <button className='bg-blue-300 w-[420px] rounded-md text-lg'>submit</button>
            </form>
        </div>
    )
}

export default ForgetPage
