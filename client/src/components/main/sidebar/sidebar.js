import React, { useEffect, useState } from "react";
import "./sidebar.css";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import SideBarChat from "./sidebarchat";

const SideBar = ({ close, run }) => {
  const [popover, openPopover] = useState(false);
  const [theme, setTheme] = useState(false);

  // popover function on mouseClick
  useEffect(() => {
    if (close === false && popover === true) {
      openPopover(false);
    }
  }, [close, popover]);

  // changing theme
  const handleTheme = () => {
    run();
    setTheme(!theme);
  };

  return (
    <div className={`sidebar ${theme ? "dark__theme2 " : "light__theme"}`}>
      <div
        className={`sidebar__header ${theme ? "dark__theme " : "light__theme"}`}
      >
        <Avatar
          alt="kano"
          src="https://media.gq-magazine.co.uk/photos/63c69803775518c30f8672dc/16:9/w_2560%2Cc_limit/5.jpg"
        />
        <div
          className={`sidebar__headerRight  ${
            theme ? "dark__theme " : "light__theme"
          }`}
        >
          <Tooltip title="Status" placement="bottom-end">
            <IconButton>
              <DonutLargeIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Chat" placement="bottom-end">
            <IconButton>
              <ChatIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Settings" placement="bottom-end">
            <IconButton
              onClick={() => {
                openPopover(!popover);
              }}
            >
              <MoreVertIcon />
              {popover && (
                <div
                  className={`popover__container ${
                    theme ? "dark__theme__popover" : "light__theme__popover"
                  }`}
                >
                  <p className="popover__item">Profile</p>
                  <p className="popover__item" onClick={handleTheme}>
                    Theme
                  </p>
                  <p className="popover__item">Settings</p>
                </div>
              )}
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <div
        className={`sidebar__search  ${
          theme ? "dark__theme2" : "light__theme2"
        }`}
      >
        <div
          className={`sidebar__searchContainer  ${
            theme ? "dark__theme__search" : "light__theme__search"
          }`}
        >
          <SearchIcon />
          <input type="text" placeholder="Search or start a new chat" />
        </div>
      </div>

      <div
        className={`chat_overflow ${theme ? "dark__theme2 " : "light__theme"}`}
      >
        <SideBarChat theme={theme} />
        <SideBarChat theme={theme} />
        <SideBarChat theme={theme} />
        <SideBarChat theme={theme} />
        <SideBarChat theme={theme} />
        <SideBarChat theme={theme} />
        <SideBarChat theme={theme} />
        <SideBarChat theme={theme} />
        <SideBarChat theme={theme} />
        <SideBarChat theme={theme} />
        <SideBarChat theme={theme} />
      </div>
    </div>
  );
};

export default SideBar;
