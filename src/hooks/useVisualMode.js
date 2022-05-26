import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replaceLatestHistoryItem = false) => {
    // REPLACE = true: instead of adding to the history, 
    // 1, 2, 3
    // replace = true: 1,2,1
    // replace = false: 1,2,3,1

    if (replaceLatestHistoryItem === true) { //replace the current state but do not add to the history. 
      setMode(mode);
      const copiedHistory = [...history] // 
      const poppedEl = copiedHistory.pop(); //they don't return the array.
      setHistory([...copiedHistory, mode]);
      //setHistory.splice(history.length-1, 1, mode)

    } else {
      setMode(mode)
      setHistory([...history, mode])
    }
  };

  const back = () => {
    if (history.length === 1) return;
    setMode(history[history.length - 2])
    setHistory(history.slice(0, history.length - 1))
  };

  console.log('useVisualMode.js - history', history)

  return {
    mode,
    history,
    transition,
    back
  }
}