"use client"
import { getAllChatBots } from '@/services/chatbot'
import React, { useEffect, useState } from 'react'


const Explore = () => {
    const[data,setData] = useState([])


    async function getData() {
        let res = await getAllChatBots()
        let ans = await res.json()
        console.log(ans)
    }
    useEffect(()=>{
        getData()
    },[])
  return (
    <>
    <div style={{fontSize:'2.5rem'}}>Explore</div>
    {console.log(data)}
    
    </>


  )
}

export default Explore