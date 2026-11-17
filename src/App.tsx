import { useState, type ComponentType } from "react";
import CustomHooksDemo from "./components/CustomHooksDemo";
import EffectsDemo from "./components/EffectsDemo";
import LifecycleDemo from "./components/LifecycleDemo";
import RefsDemo from "./components/RefsDemo";
import RenderingDemo from "./components/RenderingDemo";

type Topic = { id: string; label: string; summary: string; Component: ComponentType };

const TOPICS: Topic[] = [
  { id: "rendering", label: "Rendering", summary: "What triggers a render, and what doesn't.", Component: RenderingDemo },
  { id: "lifecycle", label: "Lifecycle", summary: "Mount, update and unmount through useEffect.", Component: LifecycleDemo },
  { id: "effects", label: "useEffect", summary: "Syncing with things React doesn't own.", Component: EffectsDemo },
  { id: "refs", label: "useRef", summary: "DOM access and values that don't cause renders.", Component: RefsDemo },
  { id: "hooks", label: "Custom hooks", summary: "Reusable stateful logic, composed from hooks.", Component: CustomHooksDemo },
];

export default function App() {
  const [activeId, setActiveId] = useState(TOPICS[0].id);
  const active = TOPICS.find((t) => t.id === activeId) ?? TOPICS[0];
  const { Component } = active;

  return (
    <div className="layout">
      <aside className="sidebar">
        <h1>React core concepts</h1>
        <nav aria-label="Topics">
          {TOPICS.map((topic) => (
            <button
              key={topic.id}
              className="nav-item"
              aria-current={topic.id === activeId ? "page" : undefined}
              onClick={() => setActiveId(topic.id)}
            >
              {topic.label}
            </button>
          ))}
        </nav>
        <p className="hint">Switching topics unmounts the previous one. Open the Lifecycle tab to see why that matters.</p>
      </aside>

      <main className="content">
        <header>
          <h2 className="topic-title">{active.label}</h2>
          <p className="muted">{active.summary}</p>
        </header>
        <Component key={active.id} />
      </main>
    </div>
  );
}
