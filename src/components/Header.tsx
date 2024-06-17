import "./Header.css";

interface HeaderProps {
  children: React.ReactNode;
}

function Header(props: HeaderProps) {
  return (
    <>
      <header className="header">
        <p className="logo">NeuroCircuit</p>
        <nav className="navbar">{props.children}</nav>
      </header>
    </>
  );
}

export default Header;
