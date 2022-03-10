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

export default Controls;
