import React, { useState, useEffect, useRef } from "react";
import { truncateStr } from "./utils/truncateStr";
import { Link } from "react-router-dom";

const Navbar = ({ updateWallet, showConnectModal, wallet }) => {
  const [toggleValue, setToggle] = useState(false);

  const navRef = useRef(null);

  const handleToggle = () => {
    setToggle(!toggleValue);
  };

  const closeNavOnScroll = () => {
    if (toggleValue) {
      setToggle(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", closeNavOnScroll);
    return () => {
      window.removeEventListener("scroll", closeNavOnScroll);
    };
  }, [toggleValue]);

  return (
    <nav className="navbar ">
      <div className="nav__header">
        <div
          onClick={handleToggle}
          className={
            (toggleValue && "nav__burger nav__burger--close") || "nav__burger"
          }
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="navbar__logo" href="/">
          d<span className="text-[#b95ce0]">Vote</span>
        </div>
      </div>
      <ul
        ref={navRef}
        className={
          (toggleValue && "nav__links nav__links--expanded") || "nav__links"
        }
      >
        <div className="max-md:flex-col max-md:justify-center max-md:items-center max-md:px-2">
        <Link to="/" className="text-lg font-semibold">Home</Link>
        <Link to="create-contest" className="text-lg font-semibold">Create Contest</Link>
        <Link to="contests" className="text-lg font-semibold">Contests</Link>
        <a
          href={"https://moi.technology"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold">
          Built on MOI
        </a>
        <button
          className="px-4 py-2 max-md:mt-4 max-md:mx-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none"
          onClick={wallet ? () => updateWallet() : () => showConnectModal(true)}
        >
          {wallet
            ? `Disconnect: ${wallet && truncateStr(wallet.getAddress(), 11)}`
            : "Connect"}
        </button>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
