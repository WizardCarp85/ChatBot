"use client"
import { login } from '@/services/auth';
import React, { useState } from 'react'
const Signup = () => {
  const [form,setForm] =useState({
    email:"",
    password:""
  })
  function handleChange(e){
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setForm({
      ...form,[fieldName]:fieldValue,
    })
  }
  async function handleSubmit(e){
    try{e.preventDefault()
    const response = await login(form);
    const{token} = response;
    localStorage.setItem('token',token)
    console.log(response)
    console.log(form)}
    catch(err){
      alert(err)
      console.log(err)
    }
  }
  return (
    <>
    <h1  style={{display:'flex' ,justifyContent:'center' ,fontSize:'35px',margin:'50px'}}>Login </h1>
    <form onSubmit={handleSubmit} style={{display:'flex' ,justifyContent:'center' ,fontSize:'35px',margin:'50px'}}>
      <input name='email' type='email' placeholder='email' value={form.email} onChange={handleChange}></input>
      <input name='password' type='password' placeholder='password' value={form.password} onChange={handleChange}></input>
      <button type='submit'>Login</button>
    </form>
    <p  style={{display:'flex' ,justifyContent:'center' ,fontSize:'20px',margin:'50px'}}> Don't have an account? <a href='/auth/signup'> SignUp </a> First</p>
    </>
  )
}
export default Signup