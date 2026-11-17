import { useEffect, useState } from "react";

export default function EffectsDemo() {
  const [width, setWidth] = useState(window.innerWidth);
  const [name, setName] = useState("");

  // Subscribe to an external system, and unsubscribe in cleanup.
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Sync React state to something React doesn't own (the document title).
  useEffect(() => {
    const original = document.title;
    if (name) document.title = `Hello, ${name}`;
    return () => {
      document.title = original;
    };
  }, [name]);

  // Derived data belongs in render, not in an effect + extra state.
  const isLong = name.length > 10;

  return (
    <div className="stack">
      <section>
        <h2>Subscription with cleanup</h2>
        <p>
          Window width: <strong>{width}px</strong>
        </p>
        <p className="hint">Resize the browser window. Switch tabs and the listener is removed.</p>
      </section>

      <section>
        <h2>Syncing with the outside world</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          aria-label="Your name"
        />
        <p>
          Look at the browser tab title. {isLong ? "That is a long name!" : "Try a name longer than 10 characters."}
        </p>
        <p className="hint">
          <code>isLong</code> is computed during render. No effect, no extra state.
        </p>
      </section>
    </div>
  );
}
