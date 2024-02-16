import React, { useContext, useEffect, useRef, useState } from 'react'
import { json, useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/Auth';

const UpdateProfile = () => {

    const authCtx = useContext(AuthContext);
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
        <div className='flex flex-col gap-3'>
            <div className='flex  justify-between' >
                <h3>Contact Details</h3>
                <button onClick={cancelHandler} >cancel</button>
            </div>
            <div>
                <form onSubmit={submitHandler} >
                    <label>
                        Full Name:
                        <input type='text' onChange={handleFullName} value={authCtx.token ? userData.displayName : ""} ref={fullName} />
                    </label>
                    <label>
                        Profile Photo  URL:
                        <input type='text' onChange={handleProfilePhoto} value={authCtx.token ? userData.photoUrl : ""} ref={photoUrl} />
                    </label>
                    <button>Update</button>
                </form>
            </div>
            <div><button onClick={()=>verifyEmailHandler(authCtx.token)} >Verify Email</button></div>

        </div>
    )
}

export default UpdateProfile
