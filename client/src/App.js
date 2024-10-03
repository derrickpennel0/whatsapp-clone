import React, { useState } from "react";
import "./App.css";
import Chat from "./components/main/chat/chat";
import SideBar from "./components/main/sidebar/sidebar";

function App() {
  const [popover, openPopover] = useState(false);
  const [theme, setTheme] = useState(false);

  const handleClose = () => {
    openPopover(!popover);
  };

  const handleTheme = () => {
    setTheme(!theme);
  };

  return (
    <div className="app" onClick={handleClose}>
      <div className="app__body">
        <SideBar close={popover} run={handleTheme} />
        <Chat theme={theme} />
      </div>
    </div>
  );
}

export default App;
