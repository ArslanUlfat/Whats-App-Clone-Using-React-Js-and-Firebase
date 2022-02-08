import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Chat.css";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicNoneIcon from "@mui/icons-material/MicNone";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import db from "../firebase-conf";
import { useStateValue } from "../StateProvider";
import firebase from "firebase/compat";
function Chat() {
  const [Input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data()));
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
      console.log(messages.message);
    }
  }, [roomId]);

  const sendMessage = (event) => {
    event.preventDefault();
    console.log(Input);
    db.collection("rooms").doc(roomId).collection("messages").add({
      name: user.displayName,
      message: Input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (
    <>
      <div className="chat">
        <div className="chat_header">
          <Avatar src={roomName.imgUrl} />
          <div className="chat_header_info">
            <h4>{roomName.name}</h4>
            <p>
              {!Input ? (
                new Date(
                  messages[messages.length - 1]?.timestamp?.toDate()
                ).toUTCString()
              ) : (
                <p>{user.displayName} is writting...</p>
              )}
            </p>
          </div>
          <div className="chat_header_right">
            <SearchIcon />
            <AttachFileIcon />
            <MoreVertIcon />
          </div>
        </div>
        <div className="chat_body">
          {messages.map((message) => (
            <p
              className={`chat_message ${
                message.name === user.displayName && "chat_receiver"
              }`}
            >
              <span className="chat_name">{message.name}</span>
              {message.message}
              <span className="chat_time_stamp">
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          ))}
        </div>
        <div className="chat_footer">
          <InsertEmoticonIcon />
          <MicNoneIcon />
          <form>
            <input
              value={Input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Type a message..."
            />
            <button type="submit" onClick={sendMessage}>
              <SendIcon />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Chat;
