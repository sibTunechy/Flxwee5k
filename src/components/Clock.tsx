import React, { useState, useEffect } from 'react';
import { Clock as ClockIcon } from 'lucide-react';

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <div className="flex items-center gap-3 mb-4">
        <ClockIcon className="h-6 w-6 text-blue-400" />
        <h2 className="text-xl font-semibold text-white">Current Time</h2>
      </div>
      
      <div className="text-center">
        <div className="text-3xl font-mono font-bold text-white mb-2">
          {formatTime(time)}
        </div>
        <div className="text-blue-200 text-sm">
          {formatDate(time)}
        </div>
      </div>
    </div>
  );
}