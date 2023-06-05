import React, { useState, useRef } from 'react'
import './App.css';
import { Auth } from './components/Auth/Auth.js'
import { Chat } from './components/Chat/Chat.js'
//
import {signOut} from 'firebase/auth'
import { auth } from './firebase_config';
//
import Cookies from "universal-cookie";
const cookies = new Cookies();


function App() {
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
  return <> {room ? <Chat room={room} /> : <div className="room">
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
