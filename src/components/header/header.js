import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

// Styles
import "../../styles/tailwind.css";

const HeaderLink = (props) => {
  return (
    <div className="float-right ml-5 cursor-pointer float-right bg-gray-700 pl-3 pr-3 pt-3 pb-3 rounded-lg hover bg-gray-400">
      <Link to={`/${props.link}`}>{props.text}</Link>
    </div>
  );
};

const Header = () => {
  return (
    <div className="flex items-center flex-row p-8 shadow-md bg-gray-800 text-gray-100">
      <img src={Logo} style={{ height: "60px" }} className="ml-8" />
      <div className="text-2xl mr-8 ml-8">Merchant Dashboard</div>
      <HeaderLink text="Campaign" link="" />
    </div>
  );
};

export default Header;
