"use client";
import { AuthContext } from "@/context/auth";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createChatbot, getChatbots } from "@/services/chatbot";
import { getToken } from "@/helpers/auth";

const Dashboard = () => {
  const globalData = useContext(AuthContext);
  const isLoggedIn = globalData.isLoggedIn;

  const [chatbots, setChatbots] = React.useState([]);
  const [chatbotName, setChatbotName] = React.useState("");
  const [chatbotContext, setChatbotContext] = React.useState("");
  const router = useRouter();

  useEffect(()=>{
    getChatbots({token:getToken()}).then((res)=>{
      setChatbots(res)
    })
  },[])

  const handleAddChatbot = async () => {
    if(chatbotName.trim() === "" || chatbotContext.trim() === "") return;
    const newBot = {
      name: chatbotName,
      context: chatbotContext,  
    }
    setChatbots((prev)=>[...prev, newBot]);
      await createChatbot({
        name:chatbotName,
        context: chatbotContext,
        token: getToken(),
      });
      setChatbotName("");
      setChatbotContext("");
  };

  if (!isLoggedIn) {
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <p>You are not logged in</p>
        <p>
          Click here to <Link href="../auth/login">Login</Link>
        </p>
      </div>
    );
  }

  return (
    <>
    <div className="chat-top">
      <div
        style={{
          textAlign: "center",
          border: "4px solid black",
          margin: "3px",
          borderRadius: "8px",
          width: "20em",
          height: "20em",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "2px 2px 5px 3px gray",
          margin: "12px",
        }}
      >
        <input
          placeholder="chatbot name"
          value={chatbotName}
          onChange={(e) => setChatbotName(e.target.value)}
          style={{
            textAlign: "center",
            border: "4px solid black",
            margin: "3px",
            borderRadius: "8px",
            width: "20em",
          }}
        />
        <br />
        <textarea
          placeholder="context"
          value={chatbotContext}
          onChange={(e) => setChatbotContext(e.target.value)}
          style={{
            textAlign: "center",
            border: "4px solid black",
            margin: "3px",
            borderRadius: "8px",
            width: "20em",
            height: "10em",
          }}
        />
        <br />
        <button
          onClick={handleAddChatbot}
          style={{
            textAlign: "center",
            border: "2px solid blue",
            margin: "3px",
            borderRadius: "8px",
            fontWeight: "600",
            width: "11em",
            backgroundColor: "#0247fe",
            color: "white",
          }}
          className="add-bot"
        >
          Add Chatbot
        </button>
      </div>
      </div>
      <div className="cards-layout">
        {chatbots.map((chatbot, index) => (
          <div
            key={index}
            style={{
              border: "4px solid gray",
              borderRadius: "8px",
              padding: "10px",
              margin: "10px",
              width: "19em",
            }}
            className="bot-cards"
          >
            <h3>{chatbot.name}</h3>
            <p>{chatbot.context}</p>
            <button onClick={() => router.push(`/chatbot/${chatbot.name}`)}>
              Open Chat
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
