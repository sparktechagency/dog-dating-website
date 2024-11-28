"use client"
import { FaFacebook } from "react-icons/fa"

const GoogleLogin =()=>{

    const handleFacebook=()=>{

    }

    return(
        <div className=" mb-2">
            {/* <button onClick={handleFacebook} className="btn w-full"><FaFacebook className="text-blue-600 text-2xl" />Login With Facebook</button> */}
            <button className="btn bg-[#F88D58] text-white  text-xl   max-w-sm w-full" >Sign in With Google</button>
        </div>
    )
}
export default GoogleLogin 