---
title: Animo
date: "2026-08-18"
description: "Rebuilding Animo as a native desktop app that renders educational videos with AI and Manim"
tags:
  - motion graphics
  - desktop
  - manim
  - rust
---

<img src="/animo__cover.webp" alt="Landing page of Animo" />

## Introduction

With much love ❤️ to all of you.

The code-editor extension version of Animo taught me a lot, but it also showed me its ceiling. I was fighting someone else's chat panel, fighting MCP adoption, fighting the fact that a "video editor inside a code editor" is a strange sentence to explain to a teacher who has never opened a terminal.

So I rebuilt Animo again, this time as its own native desktop app: `animo-video`, a Tauri v2 + React + Rust application. No extension host, no marketplace approval process, no editor to piggyback on. Just Animo, on your machine, doing one thing, and doing it as lean as I could make it.

### What is Animo?

Animo is a desktop app that lets educators create animated educational videos with AI. You describe what you want in chat, an AI orchestrator running as a subprocess writes a Manim scene, and Manim renders it locally on your machine. You bring your own API key, and the video is yours, rendered on your hardware.

### Going native

`animo-video` is a ground-up rewrite of the desktop app, not an incremental update, and most of that rewrite was chasing efficiency. It compiles down to a native binary now, using Tauri's own WebView instead of bundling a browser runtime: about 8MB on disk, startup that feels instant, and roughly 50 to 80MB of RAM at rest. WKWebView on macOS and WebView2 on Windows do the actual rendering, which also means the app looks and feels native to each OS instead of like a browser tab wearing a window frame. Every one of those numbers used to be an order of magnitude worse.

The React frontend moved over largely intact: components, styles, most hooks all carried across close to as is. What changed underneath is everything that used to be message calls into a JavaScript backend process are now `invoke()` calls into Rust commands, and every service that used to run in that backend (chat storage, license checks, the Manim renderer, the AI orchestrator) now lives in `src-tauri/`, compiled and considerably faster for it.

## Watching the render happen

One detail I'm proud of: while Manim renders, you see frames appear in real time instead of staring at a spinner.

The trick is understanding how Manim actually works. It doesn't render one file straight through. It renders each animation call as its own clip into a `partial_movie_files/` directory, then concatenates everything at the end. We used to skip that directory entirely when looking for the final MP4. Now a Rust file watcher sits on it, and the moment a new partial clip lands, it pulls the last frame out through an `ffmpeg` pipe straight from stdout, no temp file, no disk round trip, encodes it as base64 JPEG, and emits it to the frontend as a Tauri event. React updates an `<img>` tag. The whole loop is built to add as close to zero overhead to the actual render as possible, so watching your video build itself, animation by animation, never comes at the cost of the render finishing slower.

## A CLI, closed source on purpose

Some users wanted to drive Animo from a terminal: list chats, kick off a generation, script a batch of renders. That's a fair ask, but it came with a constraint I couldn't relax: the CLI is part of a paid, licensed product, and it cannot ship as readable JavaScript or Python. `pkg`, `bun build --compile`, Node SEA: all of them still embed recoverable source. The only artifact where "closed" is a property of the file itself, not a hope, is a compiled binary.

So `animo` is a Rust binary living in the same Cargo workspace as the app, sharing a core crate (`animo-core`) that has zero dependency on Tauri, which keeps the binary lean, around 2MB, instead of dragging in an entire webview stack it will never render. It's signed and notarized as a nested executable inside `Animo.app`, and it's invisible until a user opts in from Settings.

The harder problem wasn't packaging, it was ownership. The app assumes it's the only thing writing to chat files and settings; a CLI running alongside it breaks that assumption instantly. If the GUI has a chat open in memory and the CLI appends a message to the file on disk, the next time the GUI autosaves, it overwrites the CLI's work with a stale in-memory copy. So the CLI follows a single-writer rule: if the GUI is running, the CLI talks to it over a local, token-authenticated HTTP server on `127.0.0.1` instead of touching files directly. If the GUI is closed, the CLI takes a lockfile and writes directly. The GUI is always the source of truth for anything it's holding open.

## Licensing

The pricing model is simple: a one-time $49 license per machine, plus optional AI token packs and a paid hosted share page for publishing a finished video with a link. No subscription, no MRR chase.

## Small details

Slide decks got a presenter mode: fullscreen, a notes panel, drag-and-drop reordering, built for a teacher standing in front of a class rather than a developer at a desk. There's a template gallery for pre-built Manim scenes people can pick up and customize instead of starting from a blank prompt, which saves both time and AI tokens. And under the hood there's a bundled Python runtime plus a dependency checker that walks a new user through installing `python3`, `manim`, `ffmpeg`, and LaTeX without ever opening a terminal themselves, because the whole point of leaving the editor was to stop asking non-developers to behave like developers, and to stop making them wait on setup to get to the part that matters.

## What's next

A VTK-based rendering backend is next on the roadmap, for scientific and engineering visualizations (3D meshes, volumetric data, simulation output) alongside the standard math animations Animo already does well. After that: Linux support, a web player for embedding generated animations outside the app, and an AI scene editor for refining a scene iteratively without regenerating it from scratch.

Animo's story keeps folding back on itself: a web platform, then an editor extension, now this. Each rewrite came from admitting the last one carried too much weight, literally, in megabytes, and figuratively, in everything I made a teacher deal with just to get to a video. I don't know if this is the final shape. It's the first one that feels light enough to stop noticing.
