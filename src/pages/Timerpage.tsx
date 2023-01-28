import React, { useCallback, useEffect, useState } from "react";

import { invoke } from "@tauri-apps/api/tauri";

import Time from "../components/Time";
import Controls from "../components/Controls";

import { RouteProps } from "react-router-dom";
import PageLayout from "layouts/PageLayout";

const Homepage: React.FC<RouteProps> = () => {
  const [playing, setPlaying] = useState(false);

  const [reset, setReset] = useState(false);

  useEffect(() => {
    // add this JS snippet somewhere in your app
    window.addEventListener("contextmenu", (e) => e.preventDefault());
  }, []);

  const handlePause = useCallback(() => {
    setPlaying((p) => !p);
  }, []);

  const handleStop = useCallback(() => {
    setPlaying(false);
  }, []);

  const handleReset = useCallback(() => {
    setPlaying(false);
    setReset(true);
  }, []);

  const turnOffApps = useCallback(() => {
    if ("__TAURI_IPC__" in window) {
      invoke("turn_off_apps");
    }
  }, []);

  const turnOnApps = useCallback(() => {
    if ("__TAURI_IPC__" in window) {
      invoke("turn_on_apps");
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    if ("__TAURI_IPC__" in window) {
      invoke("toggle_dark_mode");
    }
  }, []);

  const handleStart = useCallback(() => {
    setPlaying(true);
    turnOffApps();
  }, [turnOffApps]);

  const onTimeEnd = useCallback(() => {
    setPlaying(false);
    setReset(true);
    turnOnApps();
    toggleDarkMode();
  }, [toggleDarkMode, turnOnApps]);

  return (
    <PageLayout>
      <h1>
        <Time
          playing={playing}
          reset={reset}
          handleReset={() => setReset(false)}
          onTimeEnd={onTimeEnd}
        />
      </h1>

      <Controls
        playing={playing}
        handleStart={handleStart}
        handleStop={handleStop}
        handleReset={handleReset}
        handlePause={handlePause}
      />

      <button onClick={turnOffApps}>Turn off Apps</button>
      <button onClick={turnOnApps}>Turn On Apps</button>

      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
    </PageLayout>
  );
};

export default Homepage;
