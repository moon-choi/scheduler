import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = mode => {
    setMode(mode)
    setHistory([...history, mode])
  };
  const back = () => {
    if (mode === initial) {
      return
    }

    setMode(history[history.length - 2])
    setHistory(history.slice(0, history.length - 1))
  };



  console.log('mode', mode)
  console.log('history', history)

  return {
    mode,
    history,
    transition,
    back
  }
}
