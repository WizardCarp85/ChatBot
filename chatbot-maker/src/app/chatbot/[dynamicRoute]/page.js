"use client"
import { getToken } from '@/helpers/auth';
import { askGemini } from '@/services/ai';
import { getChatbotByName } from '@/services/chatbot';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const Page1 = () => {
  const params = useParams();
  const chatBotName = params.dynamicRoute;
  const [botDetails, setBotDetails] = useState({
    name: "",
    context: "",
  });
  const [message, setMessage] = useState("");
  const [geminiReply, setGeminiReply] = useState("");
  const handleSendMessage = async () => {
    try {
      const response = await askGemini({
        text: message,
        context: botDetails.context
      });
      const data = await response.json();
      const botMessage = data.response.candidates[0].content.parts[0].text;
      console.log(botMessage);
      setGeminiReply(botMessage)
    } catch (error) {
      console.error("Error handling message:", error);
    }
  };
  useEffect(() => {
    if (!chatBotName) return;
    const token = getToken();
    console.log("Token:", token);
    getChatbotByName({ token, name: chatBotName })
      .then((data) => {
        console.log("Fetched chatbot data:", data);
        setBotDetails({ ...data });
      })
      .catch((error) => {
        console.error("Error fetching chatbot:", error);
      });
  }, [chatBotName]);

  console.log(botDetails)

  return (
    <div>
      <h1>{botDetails.name}</h1>
      <h2>{botDetails.context}</h2>
      <div>
        <input placeholder='Type your message...' type='text' onChange={(e) => setMessage(e.target.value)}></input>
        <button onClick={handleSendMessage}>SEND</button>
        <h1>{geminiReply}</h1>
      </div>
    </div>
  )
}
export default Page1