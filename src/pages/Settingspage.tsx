import React, { useCallback } from "react";
import { Link, RouteProps } from "react-router-dom";

import { ReactComponent as HomeIcon } from "../icons/home.svg";

import { useStore } from "../App";

const SettingsPage: React.FC<RouteProps> = () => {
  const timerMinutes = useStore((state) => state.timerMinutes);
  const setTimerMinutes = useStore((state) => state.setTimerMinutes);

  const handleTimerMinutesChange = useCallback(
    (e) => {
      console.log(e.target.value);
      setTimerMinutes(e.target.value);
    },
    [setTimerMinutes]
  );

  return (
    <>
      <Link to="/">
        <HomeIcon />
      </Link>
      <h1>Settings</h1>

      <label htmlFor="timerMinutes"></label>
      <input
        style={{ padding: 30, fontSize: 16 }}
        id="timerMinutes"
        type="number"
        min="1"
        max="100"
        value={timerMinutes}
        onChange={handleTimerMinutesChange}
      />
    </>
  );
};

export default SettingsPage;
