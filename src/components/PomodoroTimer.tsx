import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';

export function PomodoroTimer() {
  const [sessionLength, setSessionLength] = useState(25 * 60); // 25 minutes in seconds
  const { time, isRunning, start, pause, reset, formatTime } = useTimer(sessionLength);

  const handleReset = () => {
    reset(sessionLength);
  };

  const progress = ((sessionLength - time) / sessionLength) * 100;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <Timer className="h-6 w-6 text-purple-400" />
        <h2 className="text-xl font-semibold text-white">Pomodoro Timer</h2>
      </div>

      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="3"
            />
            <path
              d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="3"
              strokeDasharray={`${progress}, 100`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-mono font-bold text-white">
              {formatTime()}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-3 mb-4">
          <button
            onClick={isRunning ? pause : start}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isRunning ? 'Pause' : 'Start'}
          </button>
          
          <button
            onClick={handleReset}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>

        <div className="flex items-center justify-center gap-2">
          <label htmlFor="session-length" className="text-sm text-white">
            Session Length:
          </label>
          <select
            id="session-length"
            value={sessionLength / 60}
            onChange={(e) => {
              const newLength = parseInt(e.target.value) * 60;
              setSessionLength(newLength);
              reset(newLength);
            }}
            className="bg-white/10 text-white rounded px-2 py-1 text-sm border border-white/20"
          >
            <option value={15}>15 min</option>
            <option value={25}>25 min</option>
            <option value={30}>30 min</option>
            <option value={45}>45 min</option>
          </select>
        </div>
      </div>
    </div>
  );
}