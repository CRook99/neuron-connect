import "./Header.css";


function Header() {
  return (
    <>
      <header className="header">
        <div className="logo">
          <i className="logo-image" />
        </div>
        <nav className="navbar">
          <a href="/about">About</a>
        </nav>
      </header>
    </>
  );
}


// function Header() {
//   return (
//     <>
//       <nav className="navbar">
//         <div className="navbar-container">
//           <i className="logo-icon" />
//           <div className="about">
//             <p>About</p>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }

export default Header;
