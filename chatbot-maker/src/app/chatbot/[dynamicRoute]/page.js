"use client"
import { useParams } from 'next/navigation'
import React from 'react'
const Page1 = () => {
  const params = useParams();
  return (
    <div>
      {console.log(params)}
      <h1>{params.name}</h1>
    </div>
  )
}

export default Page1