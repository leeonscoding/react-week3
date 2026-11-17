import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { usePrevious } from "../hooks/usePrevious";
import { useSearch } from "../hooks/useSearch";

export default function CustomHooksDemo() {
  const [query, setQuery] = useState("");
  const { results, status } = useSearch(query);

  const [note, setNote] = useLocalStorage("rcc:note", "");

  const [score, setScore] = useState(0);
  const previousScore = usePrevious(score);

  return (
    <div className="stack">
      <section>
        <h2>useSearch (useDebounce + abortable effect)</h2>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try: re, v, or s"
          aria-label="Search frameworks"
        />
        <p className="hint">
          Status: <code>{status}</code>. Requests only fire 400ms after you stop typing, and stale ones are
          aborted.
        </p>
        <ul className="chips">
          {results.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        {status === "success" && results.length === 0 && <p className="muted">No matches. Try a shorter query.</p>}
      </section>

      <section>
        <h2>useLocalStorage</h2>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write something, then refresh the page"
          aria-label="Persisted note"
          rows={3}
        />
      </section>

      <section>
        <h2>usePrevious</h2>
        <p>
          Now: <strong>{score}</strong> · Before: <strong>{previousScore ?? "none yet"}</strong>
        </p>
        <div className="actions">
          <button onClick={() => setScore((s) => s + 1)}>+1</button>
          <button onClick={() => setScore((s) => s + 10)}>+10</button>
        </div>
      </section>
    </div>
  );
}
