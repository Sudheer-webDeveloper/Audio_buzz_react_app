import React from "react";
import { HiMoon } from "react-icons/hi";
import { BsSun } from "react-icons/bs";
import { useMusicContext } from "../../Context";

const Navbar = () => {

 const {darkmode,toggleDarkMode} = useMusicContext()


  return (
    <nav className="nav">
      <div className="logo-text">
        <h1>Audio Buzz</h1>
      </div>
      <div className="button">
        <h2 onClick={toggleDarkMode}>
        {darkmode?  <HiMoon /> : <BsSun /> }
        </h2>
      </div>
    </nav>
  );
};

export default Navbar;
