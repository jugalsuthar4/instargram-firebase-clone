import React, { useState } from "react";
import "./Header.css";
import instagramLogo from "../images/instagram-text.svg";
import HomeIcon from "@material-ui/icons/Home";
import { useAuth } from "../contexts/AuthContext";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

function Header() {
  const {logout,currentUser}=useAuth()
  const [popoverOpen, setPopoverOpen] = useState(false);
  const handleLogout=async ()=>{
       try {
            await logout()
            alert("you are now logout")
       } catch (error) {
           alert(error.message)
       }
  }

  const toggle = () => setPopoverOpen(!popoverOpen);
  return (
    <div className="header">
      <div className="header__logo">
        <img src={instagramLogo} alt="instagram-logo" />
      </div>
      <div className="header__search">
        <input type="text" placeholder="🔍 Search" />
      </div>
      <div className="icons">
        <HomeIcon fontSize="large" className="header_icon" />
        <ChatBubbleOutlineIcon fontSize="large" className="header_icon" />
        <LocationOnOutlinedIcon fontSize="large" className="header_icon" />
        <FavoriteBorderIcon fontSize="large" className="header_icon" />
        <Avatar
          alt={currentUser.displayName}
          id="Popover1"
          className="avatar"
          src="/static/images/avatar/3.jpg"
        />
        <Button variant="contained" style={{marginLeft:"10px"}} color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Header;
