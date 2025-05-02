"use client"
import React, { useState} from 'react'
import { signup } from '@/services/auth';

const Signup = () => {
  const[form,setForm] = useState({
    email: " ",
    password: " ",
  });

  function handleChange(e){
    const field = e.target.name;
    const fieldValue = e.target.value;
    setForm({
      ...form,
      [field]: fieldValue,
    })
  }
  async function handleSubmit(e){
    e.preventDefault();
    const response = await signup(form);
    console.log(response)
    console.log(form)
  }
  return (
    <div className='signupform'>
      <h1>Signup</h1>
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <input name='email' type='email' placeholder ='email'></input>
        <input name='password' type='password' placeholder ='password'></input>
        <button type='submit'>Signup</button>
      </form>
    </div>
  )
}

export default Signup;