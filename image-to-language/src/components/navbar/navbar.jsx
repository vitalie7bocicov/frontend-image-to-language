import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgMenuGridR } from "react-icons/cg";
import { signOut } from "../../services/authSerive";
import { AiOutlineHome } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import "./navbar.css";

const Navbar = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const navigate = useNavigate();

  const home = (event) => {
    event.preventDefault();
    navigate("/home");
  };

  const history = (event) => {
    event.preventDefault();
    navigate("/history");
  };

  const logOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo-container">
        <CgMenuGridR className="navbar-logo" onClick={toggleOptions} />
        {showOptions && (
          <div className="navbar-options">
            <button className="navbar-option-button" onClick={home}>
              <AiOutlineHome />
              Home
            </button>
            <button className="navbar-option-button" onClick={history}>
              <FaHistory />
              History
            </button>
            <button className="navbar-option-button" onClick={logOut}>
              <BiLogOut />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
