import React from "react";

const Timer = ({ seconds }) => {
  // Format seconds into minutes:seconds if needed
  const formatTime = (totalSeconds) => {
    if (totalSeconds >= 60) {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    return `${totalSeconds}s`;
  };

  return (
    <div className="text-center mb-4">
      <div className="text-3xl font-bold">{formatTime(seconds)}</div>
      <div className="text-sm text-gray-600">Time Remaining</div>
    </div>
  );
};

export default Timer;
