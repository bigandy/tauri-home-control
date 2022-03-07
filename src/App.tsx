import React, { useCallback, useEffect, useState } from "react";
import "./App.scss";
import { invoke } from "@tauri-apps/api/tauri";

const THIRTY_MINS = 60 * 30 * 1000;

function App() {
  const [count, setCount] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);

  const incrementTimer = useCallback(() => setCount((c) => c + 1), []);
  const decrementTimer = useCallback(() => setCount((c) => c - 1), []);

  useEffect(() => {
    const timer = setInterval(incrementTimer, 1000);

    console.log("here");

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleStart = useCallback(() => {
    setPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    setPlaying((p) => !p);
    setPaused((p) => !p);
  }, []);

  const handleStop = useCallback(() => {
    setPlaying(false);
  }, []);

  const turnOffApps = useCallback(() => {
    invoke("turn_off_apps");
  }, []);

  const fireEvent = useCallback(() => {
    invoke("toggle_dark_mode");
  }, []);

  return (
    <div className="App">
      <h1>{count}</h1>

      <p>{playing ? "stop" : "play"}</p>

      <div className="buttons">
        <button onClick={handleStart} disabled={playing}>
          Play
        </button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleStop} disabled={!playing}>
          Stop
        </button>
      </div>

      <button onClick={turnOffApps}>Turn off Apps</button>

      <button onClick={fireEvent}>Toggle Dark Mode</button>
    </div>
  );
}

export default App;
