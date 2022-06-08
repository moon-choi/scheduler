import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replaceLatestHistoryItem = false) => {
    // REPLACE = true: instead of adding to the history, 

    if (replaceLatestHistoryItem === true) {
      setMode(mode);
      const copiedHistory = [...history];
      copiedHistory.pop()
      setHistory([...copiedHistory, mode]);

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


  return {
    mode,
    history,
    transition,
    back
  }
}