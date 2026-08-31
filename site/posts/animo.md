---
title: Animo
date: "2026-08-18"
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

Animo was born from an idea we started gathering back in 2023: being able to generate animations through programming, so that they become programmatic videos. With that spirit, we designed a desktop app that can render your animations with any artificial intelligence method, one that stays agnostic to any OpenRouter provider or language model, and that does it in a way that feels genuinely comfortable for whoever uses it, so you can work with it conveniently.

To build this app we chose Tauri instead of Electron. The reason: we wanted it to be incredibly efficient, both so it could be installed across many computers and so it could handle rendering all the video information, frame by frame for example.

The rendering algorithm is one of the most interesting pieces of the whole thing. We use an algorithm that collects every partial clip from Manim's Partial Movie Files directory, so that each of those clips can be displayed inside the desktop program, which makes the whole process much simpler.

### What is Animo?

Animo is a cross-platform desktop app for generating educational videos with Manim.

## Watching the render happen

One detail I'm proud of: while Manim renders, you see frames appear in real time instead of staring at a spinner.

The trick is understanding how Manim actually works. It doesn't render one file straight through. It renders each animation call as its own clip into a `partial_movie_files/` directory, then concatenates everything at the end. We used to skip that directory entirely when looking for the final MP4. Now a Rust file watcher sits on it, and the moment a new partial clip lands, it pulls the last frame out through an `ffmpeg` pipe straight from stdout, no temp file, no disk round trip, encodes it as base64 JPEG, and emits it to the frontend as a Tauri event. React updates an `<img>` tag. The whole loop is built to add as close to zero overhead to the actual render as possible, so watching your video build itself, animation by animation, never comes at the cost of the render finishing slower.

## Small details

Slide decks got a presenter mode: fullscreen, a notes panel, drag-and-drop reordering, built for a teacher standing in front of a class rather than a developer at a desk. There's a template gallery for pre-built Manim scenes people can pick up and customize instead of starting from a blank prompt, which saves both time and AI tokens. And under the hood there's a bundled Python runtime plus a dependency checker that walks a new user through installing `python3`, `manim`, `ffmpeg`, and LaTeX without ever opening a terminal themselves, because the whole point of leaving the editor was to stop asking non-developers to behave like developers, and to stop making them wait on setup to get to the part that matters.

## Interactivity

The iterative scene editor that used to sit on the roadmap is now part of the app. Instead of regenerating a scene from scratch every time you want a change, you can point at what's already there and refine it: adjust a single animation, nudge the timing, swap a color, rewrite one label, and Animo edits the existing Manim scene in place rather than starting over. It keeps the parts you already liked and spends AI tokens only on the change you asked for.

## What's next

A VTK-based rendering backend is next on the roadmap, for scientific and engineering visualizations (3D meshes, volumetric data, simulation output) alongside the standard math animations Animo already does well. After that: Linux support, and a web player for embedding generated animations outside the app.

Animo's story keeps folding back on itself: a web platform, then an editor extension, now this. Each rewrite came from admitting the last one carried too much weight, literally, in megabytes, and figuratively, in everything I made a teacher deal with just to get to a video. I don't know if this is the final shape. It's the first one that feels light enough to stop noticing.
