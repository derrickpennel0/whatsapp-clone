import React, { useState, useEffect } from "react";
import "./chat.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import { Avatar, IconButton } from "@mui/material";
import Pusher from "pusher-js";
import axios from "axios";
import { API_SERVER } from "../../../config/axios";

const Chat = ({ theme }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    axios.get(API_SERVER + "/messages/sync").then((response) => {
      if (response.data.length > 0) {
        setMessages(response.data);
      } else {
        console.log("error when fetching ");
      }
    });
  }, []);

  const sendMessage = async () => {
    await axios
      .post(API_SERVER + "/messages/new", {
        name: "Chloe",
        message: inputValue.trim(),
        received: true,
        timestamp: new Date().toUTCString(),
      })
      .then((response) => {
        if (response.data.length > 0) {
          console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setInputValue("");
  };

  useEffect(() => {
    var pusher = new Pusher("02d9206839a765fbd70f", {
      cluster: "mt1",
    });

    var channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages, "messss");

  return (
    <div className="chat">
      {/* header  */}
      <div
        className={`chat__header ${theme ? "dark__theme3 " : "light__theme"}`}
      >
        <Avatar />

        <div
          className={`chat__headerInfo ${
            theme ? "dark__theme3__info" : "light__theme__info"
          }`}
        >
          <h3>Room name</h3>
          <p>Last seen at .....</p>
        </div>

        <div
          className={`chat__headerRight ${
            theme ? "dark__theme3__info" : "light__theme__info"
          }`}
        >
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      {/* body   */}
      <div
        className={`chat__body ${
          theme ? "dark__theme3__body" : "light__theme3__body"
        }`}
      >
        {/* receiver   */}
        {messages?.map((i, key) => {
          if (i.received === false) {
            return (
              <p
                key={key}
                className={`chat__message ${
                  theme ? "dark__theme3__message" : "light__theme3__message"
                }`}
              >
                <span
                  className={`chat__name ${
                    theme ? "dark__theme3__name" : "light__theme3__name"
                  }`}
                >
                  {i.name}
                </span>
                {i.message}
                <span className="chat__timestamp">{i.timestamp}</span>
              </p>
            );
          } else {
            /* sender   */
            return (
              <p className="chat__message  chat__sender" key={key}>
                <span
                  className={`chat__name ${
                    theme ? "dark__theme3__name" : "light__theme3__name"
                  }`}
                >
                  {i.name}
                </span>
                {i.message}
                <span className="chat__timestamp">{i.timestamp}</span>
              </p>
            );
          }
        })}

        {/* new Date().toUTCString()} */}
        {/* sender   */}
      </div>

      {/* footer with input field and emojis   */}
      <div className={`chat__footer ${theme ? "meeeee" : "yie"}`}>
        <InsertEmoticonIcon />
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button type="button"> Send message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
