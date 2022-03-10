import create from "zustand";

import { THIRTY_MINS } from "./utils/constants";

// const getLocalStorage = (key: string) =>
//   JSON.parse(window.localStorage.getItem(key));

// const setLocalStorage = (key: string, value: string) =>
// window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create((set: () => void) => ({
  timerMinutes: THIRTY_MINS,

  setTimerMinutes: (timerMinutes: number) =>
    // @ts-ignore
    set(() => {
      return { timerMinutes };
    }),
}));
