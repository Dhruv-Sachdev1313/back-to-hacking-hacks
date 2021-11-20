import { useEffect, useRef, useState } from "react";
import firebase from "firebase/app";
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
// import { auth } from "../hooks/firebase";
import { firestore } from "../hooks/firebase";
import {collection, doc, getDoc, orderBy, limit, query} from 'firebase/firestore';


export default function Chat () {
    const dummy = useRef();
    const messagesRef = doc('messages', course_id);
    const q = query(messagesRef, orderBy('createdAt'), limit(25));

    const [messages] = useCollectionData(q, { idField: 'id' });

    const [formValue, setFormValue] = useState('');

    const [user] = useAuthState(auth);

    


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
}

function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
  
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return (<>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        <p>{text}</p>
      </div>
    </>)
  }