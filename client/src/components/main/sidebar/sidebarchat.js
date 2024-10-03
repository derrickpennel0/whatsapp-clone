import React from "react";
import { Avatar } from "@mui/material";
import "./sidebarchat.css";

const SideBarChat = ({ theme }) => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  // console.log(formattedTime);

  return (
    <div
      className={`sidebarChat ${
        theme ? "dark__theme__new " : "light__theme__new"
      }`}
    >
      <Avatar />
      <div
        className={`sidebarChat__info ${
          theme ? "dark__theme__info " : "light__theme__info"
        }`}
      >
        <h2>Room Name</h2>
        <p>This is the last message</p>
      </div>
      <span className="time">
        {formattedTime}
        <p className="number_of_messages">4</p>
      </span>
    </div>
  );
};

export default SideBarChat;
