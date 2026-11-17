import { useEffect, useRef, useState } from "react";

export default function RefsDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<number | null>(null);
  const [ms, setMs] = useState(0);
  const [running, setRunning] = useState(false);

  // Focus on mount: the DOM node exists by the time effects run.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Safety net: never leave an interval running after unmount.
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    };
  }, []);

  function start() {
    if (intervalRef.current !== null) return;
    intervalRef.current = window.setInterval(() => setMs((m) => m + 100), 100);
    setRunning(true);
  }

  function stop() {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRunning(false);
  }

  function reset() {
    stop();
    setMs(0);
  }

  return (
    <div className="stack">
      <section>
        <h2>Ref to a DOM node</h2>
        <input ref={inputRef} placeholder="I was focused on mount" aria-label="Focus demo" />
        <div className="actions">
          <button onClick={() => inputRef.current?.focus()}>Focus input</button>
          <button className="ghost" onClick={() => inputRef.current?.select()}>
            Select text
          </button>
        </div>
      </section>

      <section>
        <h2>Ref as a mutable box</h2>
        <p className="big">{(ms / 1000).toFixed(1)}s</p>
        <div className="actions">
          <button onClick={start} disabled={running}>
            Start
          </button>
          <button onClick={stop} disabled={!running}>
            Stop
          </button>
          <button className="ghost" onClick={reset}>
            Reset
          </button>
        </div>
        <p className="hint">
          The interval id lives in a ref: it must survive renders, but changing it should not cause one.
        </p>
      </section>
    </div>
  );
}
