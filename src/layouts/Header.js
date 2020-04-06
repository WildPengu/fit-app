import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <>
        <div className="menu">
          <ul className="menuList">
            <li>
              <Link to="/fit-app">Kalkulator BMI</Link>
            </li>
            <li>
              <Link to="/calories">Kalkulator kalorii</Link>
            </li>
            <li>
              <Link to="/yourTraining">Zaplanuj swój trening</Link>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default Header;
