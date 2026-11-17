import { useCallback, useEffect, useState } from "react";

type LogFn = (message: string) => void;

function Child({ value, onLog }: { value: number; onLog: LogFn }) {
  // Mount + unmount: empty-ish deps, cleanup runs on unmount.
  useEffect(() => {
    onLog("mounted");
    return () => onLog("unmounted (cleanup)");
  }, [onLog]);

  // Update: runs after mount and whenever `value` changes.
  useEffect(() => {
    onLog(`effect ran, value = ${value}`);
  }, [value, onLog]);

  return (
    <p>
      Child is alive. Prop value: <strong>{value}</strong>
    </p>
  );
}

export default function LifecycleDemo() {
  const [show, setShow] = useState(true);
  const [value, setValue] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  // Stable identity, otherwise the child's effects would re-run on every parent render.
  const log = useCallback<LogFn>((message) => {
    setLogs((prev) => [...prev.slice(-9), message]);
  }, []);

  return (
    <div className="stack">
      <section>
        <h2>Mount, update, unmount</h2>
        <div className="actions">
          <button onClick={() => setShow((s) => !s)}>{show ? "Unmount child" : "Mount child"}</button>
          <button onClick={() => setValue((v) => v + 1)}>Change prop</button>
          <button className="ghost" onClick={() => setLogs([])}>
            Clear log
          </button>
        </div>
        {show && <Child value={value} onLog={log} />}
      </section>

      <section>
        <h2>Event log</h2>
        <ol className="log" aria-live="polite">
          {logs.length === 0 && <li className="muted">Nothing yet</li>}
          {logs.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ol>
        <p className="hint">
          On first load in development you will see "mounted", "unmounted", "mounted" again. That is
          StrictMode re-running effects on purpose to catch missing cleanup. It does not happen in production.
        </p>
      </section>
    </div>
  );
}
