---
title: Animo
date: "2026-03-18"
description: "Animo is a cross-platform desktop app for generating educational videos with Manim"
tags:
  - motion graphics
  - desktop
  - manim
  - rust
---

<img src="/animo__cover.webp" alt="Landing page of Animo" />

## Introduction

With much love ❤️ to all of you.

Animo was born from an idea we started gathering back in 2023: being able to generate animations through programming, so that they become programmatic videos. With that spirit, we designed a desktop app that can render your animations with any artificial intelligence method, one that stays agnostic to any <a href="https://openrouter.ai/" target="_blank">OpenRouter</a> provider or language model, and that does it in a way that feels genuinely comfortable for whoever uses it, so you can work with it conveniently.

To build this app we chose <a href="https://tauri.app/" target="_blank">Tauri</a> instead of <a href="https://www.electronjs.org/" target="_blank">Electron</a>. The reason: we wanted it to be incredibly efficient, both so it could be installed across many computers and so it could handle rendering all the video information, frame by frame for example.

The rendering algorithm is one of the most interesting pieces of the whole thing. We use an algorithm that collects every partial clip from <a href="https://www.manim.community/" target="_blank">Manim</a>'s Partial Movie Files directory, so that each of those clips can be displayed inside the desktop program, which makes the whole process much simpler.

### What is Animo?

Animo is a cross-platform desktop app for generating educational videos with Manim.

## Watching the render happen

One detail I'm proud of: while Manim renders, you see frames appear in real time instead of staring at a spinner.

The trick is understanding how Manim actually works. It doesn't render one file straight through. It renders each animation call as its own clip into a `partial_movie_files/` directory, then concatenates everything at the end. We used to skip that directory entirely when looking for the final MP4. Now a <a href="https://www.rust-lang.org/" target="_blank">Rust</a> file watcher sits on it, and the moment a new partial clip lands, it pulls the last frame out through an <a href="https://ffmpeg.org/" target="_blank">FFmpeg</a> pipe straight from stdout, no temp file, no disk round trip, encodes it as base64 JPEG, and emits it to the frontend as a Tauri event. <a href="https://react.dev/" target="_blank">React</a> updates an `<img>` tag. The whole loop is built to add as close to zero overhead to the actual render as possible, so watching your video build itself, animation by animation, never comes at the cost of the render finishing slower.

## Small details

Slide decks got a presenter mode: fullscreen, a notes panel, drag-and-drop reordering, built for a teacher standing in front of a class rather than a developer at a desk. There's a template gallery for pre-built Manim scenes people can pick up and customize instead of starting from a blank prompt, which saves both time and AI tokens. And under the hood there's a bundled <a href="https://www.python.org/" target="_blank">Python</a> runtime plus a dependency checker that walks a new user through installing `python3`, `manim`, `ffmpeg`, and <a href="https://www.latex-project.org/" target="_blank">LaTeX</a> without ever opening a terminal themselves, because the whole point of leaving the editor was to stop asking non-developers to behave like developers, and to stop making them wait on setup to get to the part that matters.

## What's next

The iterative scene editor that used to sit on this roadmap is already shipped: instead of regenerating a scene from scratch every time you want a change, you can point at what's already there and refine it, adjust a single animation, nudge the timing, swap a color, rewrite one label, and Animo edits the existing Manim scene in place rather than starting over, spending AI tokens only on the change you asked for.

Still ahead: a <a href="https://vtk.org/" target="_blank">VTK</a>-based rendering backend for scientific and engineering visualizations (3D meshes, volumetric data, simulation output) alongside the standard math animations Animo already does well, then Linux support and a web player for embedding generated animations outside the app.

Animo's story keeps folding back on itself: a web platform, then an editor extension, now this. Each rewrite came from admitting the last one carried too much weight, literally, in megabytes, and figuratively, in everything I made a teacher deal with just to get to a video. I don't know if this is the final shape. It's the first one that feels light enough to stop noticing.

## Features

- Cross-platform desktop app for macOS and Windows
- Bring your own AI key, agnostic to any OpenRouter provider or model
- Local rendering on your own hardware
- Live render preview, frame by frame as Manim works
- Iterative scene editor for refining a scene without regenerating it
- Slide decks with presenter mode, notes panel, and drag-and-drop reordering
- Template gallery of pre-built Manim scenes
- Zero-terminal setup with a bundled Python runtime and dependency checker
- Lean Tauri build, small on disk and quick to start

## References

- <a href="https://www.manim.community/" target="_blank">Manim Community</a>
- <a href="https://github.com/3b1b/manim" target="_blank">3Blue1Brown's Manim</a>
- <a href="https://tauri.app/" target="_blank">Tauri</a>
- <a href="https://www.electronjs.org/" target="_blank">Electron</a>
- <a href="https://react.dev/" target="_blank">React</a>
- <a href="https://www.rust-lang.org/" target="_blank">Rust</a>
- <a href="https://www.python.org/" target="_blank">Python</a>
- <a href="https://ffmpeg.org/" target="_blank">FFmpeg</a>
- <a href="https://www.latex-project.org/" target="_blank">LaTeX</a>
- <a href="https://openrouter.ai/" target="_blank">OpenRouter</a>
- <a href="https://vtk.org/" target="_blank">VTK</a>
