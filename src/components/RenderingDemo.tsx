import { memo, useRef, useState } from "react";
import { stamp } from "../lib/time";

function PlainChild() {
  return (
    <p>
      Plain child rendered at <code>{stamp()}</code>
    </p>
  );
}

// memo skips re-rendering when props are shallow-equal (here: no props at all).
const MemoChild = memo(function MemoChild() {
  return (
    <p>
      Memoized child rendered at <code>{stamp()}</code>
    </p>
  );
});

export default function RenderingDemo() {
  const [count, setCount] = useState(0);
  const [n, setN] = useState(0);
  const [text, setText] = useState("");
  const clicks = useRef(0);

  return (
    <div className="stack">
      <section>
        <h2>1. State re-renders, refs don't</h2>
        <p>
          Component rendered at <code>{stamp()}</code>
        </p>
        <p>
          state: <strong>{count}</strong> · ref: <strong>{clicks.current}</strong>
        </p>
        <div className="actions">
          <button onClick={() => setCount(count + 1)}>Add to state</button>
          <button
            onClick={() => {
              clicks.current += 1;
            }}
          >
            Add to ref
          </button>
        </div>
        <p className="hint">
          Click "Add to ref" a few times: nothing changes on screen. Click "Add to state" and the ref value
          finally shows up, because only then does React render again.
        </p>
      </section>

      <section>
        <h2>2. State is a snapshot</h2>
        <p>
          n: <strong>{n}</strong>
        </p>
        <div className="actions">
          <button
            onClick={() => {
              setN(n + 1);
              setN(n + 1);
              setN(n + 1);
            }}
          >
            +3 (stale, adds 1)
          </button>
          <button
            onClick={() => {
              setN((prev) => prev + 1);
              setN((prev) => prev + 1);
              setN((prev) => prev + 1);
            }}
          >
            +3 (functional, adds 3)
          </button>
          <button className="ghost" onClick={() => setN(0)}>
            Reset
          </button>
        </div>
        <p className="hint">
          Inside one event handler, <code>n</code> is the same value every time you read it. Use the
          updater form when the next value depends on the previous one.
        </p>
      </section>

      <section>
        <h2>3. A parent render re-renders its children</h2>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type here and watch the timestamps"
          aria-label="Type to trigger parent renders"
        />
        <PlainChild />
        <MemoChild />
      </section>
    </div>
  );
}
