import "./Header.css";
import { useState } from "react";

interface HeaderProps {
  children: React.ReactNode;
}

function Header(props: HeaderProps) {
  return (
    <>
      <header className="header">
        <p className="logo">NeuroConnect</p>
        <nav className="navbar">
          {props.children}
          <div>About</div>
        </nav>
      </header>
    </>
  );
}

export default Header;
