import { useEffect, useState } from "react";
import { searchFrameworks } from "../lib/fakeApi";
import { useDebounce } from "./useDebounce";

export type SearchStatus = "idle" | "loading" | "success" | "error";

export function useSearch(query: string) {
  const debouncedQuery = useDebounce(query.trim(), 400);
  const [results, setResults] = useState<string[]>([]);
  const [status, setStatus] = useState<SearchStatus>("idle");

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      setStatus("idle");
      return;
    }

    const controller = new AbortController();
    setStatus("loading");

    searchFrameworks(debouncedQuery, controller.signal)
      .then((data) => {
        setResults(data);
        setStatus("success");
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setStatus("error");
      });

    // Cleanup: cancel the in-flight request so an old response can never overwrite a newer one.
    return () => controller.abort();
  }, [debouncedQuery]);

  return { results, status };
}
