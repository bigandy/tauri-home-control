import React, { useCallback, useEffect, useState } from "react";

import "./App.scss";
import { invoke } from "@tauri-apps/api/tauri";

const THIRTY_MINS = 60 * 30 * 1000;
// const THIRTY_MINS = 60 * 1000;
const TIME_REDUCTION = 1000;

const Time = ({
  playing,
  reset,
  handleReset,
  onTimeEnd,
}: {
  playing: boolean;
  reset: boolean;
  handleReset: () => void;
  onTimeEnd: () => void;
}) => {
  const [count, setCount] = useState(THIRTY_MINS);

  const decrementTimer = useCallback(
    () => setCount((c) => c - TIME_REDUCTION),
    []
  );

  useEffect(() => {
    let timer: any;

    if (playing) {
      timer = setInterval(decrementTimer, TIME_REDUCTION);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [playing, decrementTimer]);

  useEffect(() => {
    if (count === 0) {
      onTimeEnd();
    }
  }, [count, onTimeEnd]);

  useEffect(() => {
    if (reset) {
      setCount(THIRTY_MINS);
      handleReset();
    }
  }, [reset, setCount, handleReset]);

  return (
    <div className="timer">
      <span className="digits">
        {("0" + Math.floor((count / 60000) % 60)).slice(-2)}:
      </span>
      <span className="digits">
        {("0" + Math.floor((count / 1000) % 60)).slice(-2)}
      </span>
    </div>
  );
};

const Controls = ({
  playing,
  handleStart,
  handleStop,
  handleReset,
  handlePause,
}: {
  playing: boolean;
  handleStart: () => void;
  handleStop: () => void;
  handleReset: () => void;
  handlePause: () => void;
}) => {
  return (
    <div className="buttons">
      <button onClick={handleStart} disabled={playing}>
        Play
      </button>
      <button onClick={handleReset} disabled={!playing}>
        Reset
      </button>
      <button onClick={handleStop} disabled={!playing}>
        Stop
      </button>
      <button onClick={handlePause}>Pause</button>
    </div>
  );
};

function App() {
  const [playing, setPlaying] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    // add this JS snippet somewhere in your app
    // window.addEventListener("contextmenu", (e) => e.preventDefault());
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
    <div className="App">
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
    </div>
  );
}

export default App;
