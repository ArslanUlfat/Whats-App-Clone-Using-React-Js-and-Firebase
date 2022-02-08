import React from "react";
import Avatar from "@mui/material/Avatar";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { useState, useEffect } from "react";
import db from "../firebase-conf";
import { useStateValue } from "../StateProvider";
function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    db.collection("rooms")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <>
      <div className="sidebar">
        <div className="sidebar_header">
          <div className="sidebar_left">
            <Avatar src={user?.photoURL} />
          </div>
          <div className="sidebar_right">
            <DonutLargeIcon />
            <MoreVertIcon />
          </div>
        </div>
        <div className="sidebar_search">
          <div className="sidebar_search_container">
            <SearchIcon />
            <input type="text" placeholder="Search or Start New Chat" />
          </div>
        </div>
        <div className="sidebar_chats">
          <SidebarChat addNewChat />
          {rooms.map((room) => (
            <SidebarChat
              key={room.id}
              id={room.id}
              name={room.data.name}
              userImg={room.data.imgUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
