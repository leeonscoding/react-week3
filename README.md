# React core concepts

Small Vite + React + TypeScript project with live demos for: rendering, lifecycle, `useEffect`, `useRef` and custom hooks.

## Requirements

- Node.js 20.19+ (or 22.12+)
- npm (ships with Node)

Works the same on Windows (PowerShell / CMD / Git Bash), Linux and macOS. No shell scripts are used.

## Run

```
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Other scripts

```
npm run typecheck   # TypeScript only
npm run build       # typecheck + production build into dist/
npm run preview     # serve the production build
```

## Structure

```
src/
  components/   one demo per topic
  hooks/        useDebounce, usePrevious, useLocalStorage, useSearch
  lib/          fake async API and a timestamp helper
```
