import React, { useContext, useEffect, useRef, useState } from 'react'
import { json, useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/Auth';
import { useSelector } from 'react-redux';

const UpdateProfile = () => {

    const authCtx = useSelector(state =>state.auth.isLoggedIn);
    const fullName = useRef();
    const photoUrl = useRef();
    const navigate = useNavigate()
    const [userData, setuserData] = useState({
        displayName: '',
        photoUrl: ""
    })

    const fetchUserData = async (token) => {
        try {
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDqssr-XYkQE5aR15B7bVhhygLUnqGrHbc", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    idToken: token
                })
            })

            const data = await response.json()

            console.log(data.users[0]);
            setuserData(data.users[0] ||{displayName:"",photoUrl:""});
        } catch (error) {
            console.error("error in fetching profile data", error);
        }
    }

    const handleFullName = (e) => {
        const value = e.target.value;
        console.log(value)
        setuserData((prev) => ({ ...prev, displayName: value }))

    }

    const handleProfilePhoto = (e) => {

        const value = e.target.value;
        console.log(value)
        setuserData((prev) => ({ ...prev, photoUrl: value }))

    }

    useEffect(() => {
       if(authCtx.token){
        fetchUserData(authCtx.token)
       }
    }, [authCtx.token]);

    // fetchUserData(authCtx.token)

    const verifyEmailHandler = async (token)=>{

        try {
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDqssr-XYkQE5aR15B7bVhhygLUnqGrHbc", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    idToken: token,
                    requestType:'VERIFY_EMAIL'
                })
            })

            const data = await response.json()

            // console.log(data.error.errors[0].message);

            if(response.ok){
                console.log("email send successfully to verify it")
            }else{
                console.error("Error in verfying emailID",data.error.errors[0].message)

                if(data.error.errors[0].message === "INVALID_ID_TOKEN"){
                    alert("you are not loggedIn")

                }else if(data.error.errors[0].message === "USER_NOT_FOUND"){
                    alert("your email does not exist in our data")
                }else{
                        alert("something went wrong or slow newtwork")
                }
            }

          
         
        } catch (error) {
            console.error("error in verifying profile email", error);
        }

    }


    const submitHandler = (e) => {
        e.preventDefault();

        try {
            const sendData = async (fullName, photoUrl, token) => {

                const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDqssr-XYkQE5aR15B7bVhhygLUnqGrHbc", {
                    method: "POST",
                    body: JSON.stringify({
                        idToken: token,
                        displayName: fullName,
                        photoUrl: photoUrl,
                        returnSecureToken: false
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const data = await response.json();

                console.log(data);

                if (response.ok) {
                    navigate("/dashboard")
                }


            }

            sendData(fullName.current.value, photoUrl.current.value, authCtx.token);
        } catch (error) {
            console.error("ERROR", error)
        }

    }

    const cancelHandler = () => {
        navigate("/dashboard")
    }
    return (
        <div className="flex flex-col gap-3 p-4 md:w-1/2 mx-auto">
        <div className="flex justify-between items-center">
          <h3>Contact Details</h3>
          <button onClick={cancelHandler} className="text-blue-500 hover:text-blue-700">Cancel</button>
        </div>
        <div>
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <div>
              <label className="text-sm">
                Full Name:
                <input
                  type="text"
                  value={""}
                  onChange={handleFullName}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </label>
            </div>
            <div>
              <label className="text-sm">
                Profile Photo URL:
                <input
                  type="text"
                  value={""}
                  onChange={handleProfilePhoto}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </label>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white rounded-md py-2 px-4">
              Update
            </button>
          </form>
        </div>
        <div>
          <button onClick={verifyEmailHandler} className="bg-blue-500 hover:bg-blue-700 text-white rounded-md py-2 px-4">
            Verify Email
          </button>
        </div>
      </div>
  
    )
}

export default UpdateProfile
