"use client"
import { getToken } from '@/helpers/auth';
import { getChatbotByName } from '@/services/chatbot';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page1 = () => {
  const params = useParams();
  const {name: chatBotName} = useParams();
  const [botDetails, setBotDetails] = useState({
    name: "",
    context: "",
  });
  console.log(botDetails.context)
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    if(!params.name) return;
    const token = getToken();

    getChatbotByName({ token, name: chatBotName }).then((data)=>{
      setBotDetails({...data});
    });
  },[chatBotName]);


  return (
    <div>
      {console.log(params)}
      <h1>{params.name}</h1>
      <h2>{params.context}</h2>
    </div>
  )
}

export default Page1