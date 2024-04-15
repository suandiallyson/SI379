import "./App.css";
import React, { useState, useEffect, useRef } from "react";

// used chatGPT for debugging help and
const LemonTimerApp = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [timer, setTimer] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timer > 0) {
      intervalRef.current = setTimeout(() => setTimer(timer - 1), 1000);
    } else if (timer === 0) {
      if (isActive && !isOnBreak) {
        let newTasks = [...tasks];
        newTasks[currentTaskIndex].sessionsCompleted += 1;
        setTasks(newTasks);
        handleBreakStart();
      } else {
        handleStop();
      }
    }
    return () => clearInterval(intervalRef.current);
  }, [timer, isActive, isOnBreak, tasks, currentTaskIndex]);

  useEffect(() => {
    const updatedTasks = tasks.map((task) => ({
      ...task,
      workDuration: workDuration,
      breakDuration: breakDuration,
    }));
    setTasks(updatedTasks);
    if (isActive && currentTaskIndex != null) {
      setTimer((isOnBreak ? breakDuration : workDuration) * 60);
    }
  }, [workDuration, breakDuration]);

  const handleStart = (index) => {
    setCurrentTaskIndex(index);
    setTimer(tasks[index].workDuration * 60);
    setIsActive(true);
    setIsOnBreak(false);
  };

  const handleBreakStart = () => {
    setIsOnBreak(true);
    setTimer(breakDuration * 60);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setIsOnBreak(false);
    setCurrentTaskIndex(null);
    setTimer(null);
  };

  const addNewTask = () => {
    setTasks([
      ...tasks,
      {
        description: "",
        workDuration,
        breakDuration,
        sessionsCompleted: 0,
        isWorkSession: false,
      },
    ]);
  };

  const removeTask = (index) => {
    if (!isActive) {
      setTasks(tasks.filter((_, idx) => idx !== index));
    }
  };

  const handleTaskNameChange = (index, value) => {
    if (!isActive) {
      const newTasks = [...tasks];
      newTasks[index].description = value;
      setTasks(newTasks);
    }
  };

  return (
    <div className="lemon-timer">
      {isOnBreak ? (
        <div className="break-screen">
          <h1>Take a break!</h1>
          <span id="timer">{formatTime(timer)} </span>
          <button id="stop" onClick={handleStop}>
            <i className="fa-solid fa-square"></i> End Break
          </button>
        </div>
      ) : (
        <>
          <h1>What do you want to do?</h1>
          {tasks.map((task, index) => (
            <div
              key={index}
              className={`task ${
                isActive && index !== currentTaskIndex ? "blurred" : ""
              }`}
            >
              <input
                type="text"
                value={task.description}
                onChange={(e) => handleTaskNameChange(index, e.target.value)}
                placeholder="Enter task description"
                disabled={isActive}
              />
              <button onClick={() => removeTask(index)} disabled={isActive}>
                <i className="fa-solid fa-trash-can"></i>
              </button>
              <span className="sessions">
                {Array.from({ length: task.sessionsCompleted }, (_, i) => (
                  <i key={i} className="fa-solid fa-lemon"></i>
                ))}
              </span>
              {isActive && index === currentTaskIndex ? (
                <>
                  <i className="fa-solid fa-lemon flashing"></i>
                  <span>{formatTime(timer)} </span>
                  <button onClick={handleStop}>
                    <i className="fa-solid fa-stop"></i> Stop
                  </button>
                </>
              ) : (
                <button onClick={() => handleStart(index)}>
                  <i className="fa-solid fa-play"></i> Start
                </button>
              )}
            </div>
          ))}
          {!isActive && (
            <button onClick={addNewTask} id="addTask">
              <i className="fa-solid fa-plus"></i> Add Task
            </button>
          )}
          {!isActive && (
            <div className="interval-grid">
              <div>
                <p>Work Interval (minutes):</p>
              </div>
              <div>
                <p>Break Interval (minutes):</p>
              </div>
              <input
                type="number"
                value={workDuration}
                onChange={(e) => setWorkDuration(Number(e.target.value))}
                placeholder="25"
              />
              <input
                type="number"
                value={breakDuration}
                onChange={(e) => setBreakDuration(Number(e.target.value))}
                placeholder="5"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export default LemonTimerApp;