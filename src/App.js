import React, { useState, useRef, useEffect } from 'react'
import './App.css';
import { Auth } from './components/Auth/Auth.js'
import { Chat } from './components/Chat/Chat.js'
//
import { signOut } from 'firebase/auth'
import { db, auth } from './firebase_config';
import { messaging } from './firebase_config'
import { getToken } from "firebase/messaging";
//
import { collection, addDoc, serverTimestamp } from "@firebase/firestore";
import Cookies from "universal-cookie";
const cookies = new Cookies();


function App() {
  const messagesRef = collection(db, "newToken");
  const [isToken, setIsToken]=  useState(null)

  const requestPermission = async () => {
    const permission = await Notification.requestPermission()
    console.log("permission: ", permission)
    if (permission === "granted") {
      const token = await getToken(messaging, { vapidKey: "BFgCJHbDo5qKgHiv3SllYMcdXcM-wtacRdH140EclOuNvwlmLQwvdS9Cd9s8Ob0nHdWQAyB9P3wCTlqtyy_vcJU" })
      console.log("gen token", token)
      //
      setIsToken(token)
      //
    } else if (permission === "denied") {
      alert("you denied for notification")
    }
  }

  useEffect(() => {
    console.log("running")
    requestPermission()
  }, [])


useEffect(()=>{
  const func = async () =>{
    if(isToken !== null){
      try {
        await addDoc(messagesRef, {
          userToken: isToken,
          createdAt: serverTimestamp(),
          // user: auth.currentUser?.displayName,
        });
        console.log("added token",auth.currentUser.displayName)
      } catch (error) {
        console.log("error in adding token",error)
      }
    }
  }
  func()
},[isToken])


  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomRef = useRef()


  const signUserOut = async () => {
    await signOut(auth)
    cookies.remove("auth-token")
    setIsAuth(false)
    setRoom(null)
  }


  if (!isAuth) {
    return (
      <div
        isAuth={isAuth}
      >
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  return <> {room ? <Chat room={room}/> : <div className="room">
    <label> Type room name: </label>
    <input ref={roomRef} />
    <button onClick={() => setRoom(roomRef.current.value)}>
      Enter Chat
    </button>
  </div>}

    <div className='sign-out'><button onClick={signUserOut}>Sign Out</button></div>
  </>
}

export default App;
