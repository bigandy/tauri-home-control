import React, { useCallback } from "react";
import { RouteProps } from "react-router-dom";

import PageLayout from "layouts/PageLayout";

import { useStore } from "../store";

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
    <PageLayout>
      <h1>Settings</h1>

      <label htmlFor="timerMinutes"></label>
      <input
        id="timerMinutes"
        type="number"
        min="1"
        max="100"
        value={timerMinutes}
        onChange={handleTimerMinutesChange}
      />
    </PageLayout>
  );
};

export default SettingsPage;
