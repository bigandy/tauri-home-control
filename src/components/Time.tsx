import React, { useCallback, useEffect, useState } from "react";

import { useStore } from "../App";

import { TIME_REDUCTION } from "../utils/constants";

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
  const timerMinutes = useStore((state) => state.timerMinutes * 1000 * 20);

  const [count, setCount] = useState(timerMinutes);

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
      setCount(timerMinutes);
      handleReset();
    }
  }, [reset, setCount, handleReset, timerMinutes]);

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

export default Time;
