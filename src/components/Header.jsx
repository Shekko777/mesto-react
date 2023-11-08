import headerLogo from "../images/header/logo.svg";

function Header({ children }) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип Mesto" />
      <div className="header__container">
        {children}
      </div>
    </header>
  );
}

export default Header;
