import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase_config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  doc,
  getDocs
} from "@firebase/firestore";

import "./Styles.css";

export const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const messagesRef = collection(db, "messages");
  const tokenRef = collection(db, "newToken");



  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );

    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsuscribe();

  }, []);


  const gettingDocs = async () => {
    try {
      const data = await getDocs(tokenRef);
      console.log("read data",data)
      
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      console.log("filteredData:",filteredData)

    } catch (error) {
      console.log("error in reading docs",error)
    }

  }

  useEffect(() => {
    gettingDocs()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(newMessage)
    console.log("room", room)
    console.log("user", auth.currentUser.displayName)

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to: {room}</h1>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <span className="user">{message.user}:</span> {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};


// import React from 'react'
// import './Styles.css'

// export default function Chat() {
//   return (
//     <div className='chat-app'>
//       chatApp
//     </div>
//   )
// }
