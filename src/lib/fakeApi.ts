const FRAMEWORKS = [
  "React", "Remix", "Next.js", "Vite", "Vue",
  "Svelte", "Solid", "Angular", "Astro", "Preact",
];

/** Pretends to be a network call, and respects AbortSignal like fetch() does. */
export function searchFrameworks(query: string, signal: AbortSignal): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      const q = query.toLowerCase();
      resolve(FRAMEWORKS.filter((name) => name.toLowerCase().includes(q)));
    }, 600);

    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
}
