import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const response = await axios.post('/register', { username, password });
      console.log(response.data);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className='bg-blue-100 h-screen flex flex-col justify-center items-center'>
      <form onSubmit={(e) => { e.preventDefault(); register(); }}>
        <input 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text" 
          placeholder="Username" 
          className="border-4 border-blue-100 p-1 block rounded-xl placeholder:text-center"
        />

        <input 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password" 
          placeholder="Password" 
          className="border-4 border-blue-100 p-1 block rounded-xl placeholder:text-center"
        />

        <button 
          className='border-4 border-blue-100 p-1 w-full flex items-center justify-center bg-blue-400 rounded-full'
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
