import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <h1 className="header-title">
        <Link to={"/"} className="header-link">
          Library
        </Link>
      </h1>
      <div className="header-logo"></div>
    </div>
  );
};

export default Header;
