import React from "react";

import { Link } from "react-router-dom";

import { ReactComponent as HomeIcon } from "icons/home.svg";
import { ReactComponent as SettingsIcon } from "icons/SettingsIcon.svg";

const PageLayout: React.FC = ({ children }) => {
  return (
    <div>
      <nav>
        <Link to="/">
          <HomeIcon />
        </Link>
        <Link to="/timer">Timer</Link>
        <Link to="/settings">
          <SettingsIcon />
        </Link>
      </nav>
      {children}
    </div>
  );
};
export default PageLayout;
