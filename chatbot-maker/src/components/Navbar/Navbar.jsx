"use client"
import React from 'react'
import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '@/context/auth';
import "./navbars.css"
import { logout } from '@/services/auth';
import { destroyToken, getToken } from '@/helpers/auth';

const Navbar = () => {
  const {isLoggedIn,setIsLoggedIn} = useContext(AuthContext)

function handleLogout(){
  logout(getToken)
  destroyToken()
}

  return (
    <div className='navbar'>
        <h1 className='title'>MyApp</h1>
        <div className='links-div'>
          <Link href="../home" className='links'>Home</Link>
          <Link href="../explore" className='links'>Explore</Link>
          <Link href="../about"  className='links'>About</Link>
          <Link href="../dashboard"  className='links'>Dashboard</Link>
          {isLoggedIn ? (<button className='links buttonlogin' onClick={handleLogout}>Logout</button>) : (<Link href="../auth/login" className='links buttonlogin'>Login</Link>)}
        </div>
    </div>
  )
}
export default Navbar