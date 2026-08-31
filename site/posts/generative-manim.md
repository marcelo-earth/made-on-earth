---
title: Generative Manim
date: "2024-05-31"
description: "Creating a web editor to make animations just from text"
tags:
  - motion graphics
  - web
  - manim
  - server
---

<img src="/generativemanim__cover.webp" alt="Landing page of Animo" />

## Introduction

A year ago, I created **Generative Manim**—a web app that allows you to generate animations using the [Manim](https://www.manim.community/) library. This library is primarily used to create animations programmatically.

I launched it six days after GPT-4, and it became the most popular post on [r/ChatGPT](https://www.reddit.com/r/ChatGPT) that day.

So, it's time for the next part!

## Introducing **Animo**

### What is Animo?

**Animo** is a tool that allows you to generate animations from text. You won't need to write any code; you only need to describe what you want to represent in the animation, and Animo will do the rest. Don’t like the result? You can change it with text.

The interface of Animo **merges the standard of video production programs with the interface of a chat app**. Plus, if you're a developer, you'll love having the ability to interact with the code that generates the animation.

[Sign up](https://animo.video) to try it out.

## Philosophy & UX

I’m convinced that AI will shape our future creations in the world. But remember, we're changing the way, not the end, or the goal. There is a happy place in the future where we don't need human intervention, but today, with our current limitations, I try to incorporate human intervention in everything.

AI can create a cool animation, but the color might not be right, or the visual representation might be amazing, but the scripting could be bad. Empowering people to create amazing things is not just the "right" thing to do; it’s the necessary thing to do, at least for now.

Animo **is simple to use**, **yet** it has a lot of features that make it **more controlable**.

## Development

Animo is perhaps the longest project I’ve worked on. Much of it is because from the idea or concept to the draft, I was too busy with other creations.

But when I noticed that many people started using Generative Manim more and more (even with its limitations), I decided to give it a shot.

### Animo

Like most of my projects I use [Next.js](https://nextjs.org/) for the platform, and [Flask](https://flask.palletsprojects.com/) for the Animo Server Processor (ASP), based on Generative Manim models.

### Comparisons

I discovered two amazing tools: MotionShark and GateKeep. Both focus on helping students comprehend physics and mathematics concepts with animations. Animo, however, is more focused on the creation of animations through chat. It’s designed for teachers to create animations for their classes or for people making videos.

### Software Information

- **Project technology**: Next.js, React, Tailwind CSS, Google Cloud Platform, OpenAI, FFMPEG
- **Industry**: AI tool
- **Work Duration**: ≈9 months
- **Accessibility WCAG**: AA (2.0)
- **Version**: 1.0

## Features

- Quick generation of videos
- Export in high quality
- Customizable video format
