import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <a href="https://www.pgs-soft.com/">
        <img
          className="header__logo"
          src="https://media-exp1.licdn.com/dms/image/C4E0BAQG9U_-13MEt1w/company-logo_200_200/0/1642497152221?e=1655337600&v=beta&t=r4dpge1-GvTDMVUIECLXizAv7rf7ZWGlexLhDu3VlvY"
        />
      </a>

      <p>Playlist App</p>
    </div>
  );
}

export default Header;
