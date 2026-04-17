/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from 'react';

export const usePomodoro = (initialMinutes = 25, onComplete) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  
  const onCompleteRef = useRef(onComplete);
  
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      // Let it play out then call callback
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialMinutes * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  // Calculate percentage for circular/linear bars if needed
  const percentComplete = ((initialMinutes * 60 - timeLeft) / (initialMinutes * 60)) * 100;

  return { 
    minutes: formattedMinutes, 
    seconds: formattedSeconds, 
    isRunning, 
    startTimer, 
    pauseTimer, 
    resetTimer,
    timeLeft,
    percentComplete
  };
};
