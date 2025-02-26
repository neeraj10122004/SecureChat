import React from 'react'
import { useState } from 'react'


const Register = () => {
  const {username,setusername} = useState("");
  const [password,setpassword] = useState("");
  const register = async () =>{
    const response = await axios.post('/register',{username,password})
  };
  return (
    <div className='bg-blue-100 h-screen flex flex-col justify-center items-center'>
      <form onSubmit={register} >

        <input value={username}
         onChange={(e)=>{setusername(e.target.value)}} type="text" name="username" id="username" placeholder='username' 
         className=" border-4 border-blue-100 p-1 block black rounded-xl placeholder:text-center " />


        <input value={password} onChange={(e)=>{setpassword(e.target.value)}} type="password" name="password" id="password" placeholder="password" 
        className=" border-4 border-blue-100 p-1 block black rounded-xl placeholder:text-center " />


        <button className=' border-4 border-blue-100 p-1 w-full flex items-center justify-center bg-blue-400 rounded-full ' type="submit"><div className="">Sign Up</div></button>

      </form>
    </div>
  )
}

export default Register
