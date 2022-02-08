import Avatar from "@mui/material/Avatar";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import db from "../firebase-conf";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import firebase from "firebase/compat";
function SidebarChat({ id, name, addNewChat, userImg }) {
  const [{ user }, dispatch] = useStateValue();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  const createChat = () => {
    const roomName = prompt("Please Type The Name for Group");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
        imgUrl: user.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebar_chat">
        <Avatar src={userImg} />
        <div className="chat_info">
          <h2>{name}</h2>
          <div className="message_last">
            <p>{messages[0]?.message}</p>
          </div>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebar_chat">
      <h2>Add new Chat</h2>
    </div>
  );
}

export default SidebarChat;
