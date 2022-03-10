import React from "react";

import Homepage from "./pages/Homepage";
import Settingspage from "./pages/Settingspage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import create from "zustand";

import { THIRTY_MINS } from "./utils/constants";

// const getLocalStorage = (key: string) =>
//   JSON.parse(window.localStorage.getItem(key));

// const setLocalStorage = (key: string, value: string) =>
// window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create((set: () => void) => ({
  timerMinutes: THIRTY_MINS,

  setTimerMinutes: (timerMinutes: string) =>
    // @ts-ignore
    set(() => {
      return { timerMinutes };
    }),
}));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Homepage />} path="/" />
          <Route element={<Settingspage />} path="/settings" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
