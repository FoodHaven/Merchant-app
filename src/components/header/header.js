import React from "react";
import { Link } from "react-router-dom";

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
      <div className="text-2xl mr-8">Restaurant Dashboard</div>
      <HeaderLink text="Campaign" link="" />
    </div>
  );
};

// <HeaderLink text="Database" link="dashboard" />

export default Header;
