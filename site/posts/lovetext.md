---
title: lovetext
date: "2026-02-14"
description: "Creating a web app to send anonymous compliments that bloom into a garden"
tags:
  - next.js
  - pwa
  - supabase
  - web
  - social
---

<img src="/lovetext__cover.png" alt="Landing page of loveText" />

## Introduction

Happy Valentine's Day! ❤️

There are many different things to explain about lovetext. I think being appreciated by your friends, family, and loved ones is a very powerful thing, and I want to create a space where people can feel that way anonymously.

A social website is one of the easiest pieces of software to build, because the technology is not complex at all, but the only thing that is hard for those things to be successful is the distribution problem. Which I'm fascinated by. Because it forces you to be in a [decision dilemma](https://substack.com/home/post/p-187351524), whether you want to create a positive impact and at the same time, make people stay engaged in your website.

Over the last few years, I’ve been much more focused on tools and developing solutions. I wrote that I wanted to come back. I have a few hypotheses in mind that I want to test. I’m a huge believer in the power of experimentation at this stage and the belief that **I'm wrong most of the times**, yet only showing up is the way to learn.

If you build a better LLM, a better agent, or a better tool, those are more procedural and logical problems to solve, unlike solving distribution, which requires you to design something people _might_ like, and testing it with real users, which is something even the most powerful teams in the world struggle with. I’m not someone who knows more than them, plus I haven’t been active in this field, and this is my first time in many years building something like this. That’s why lovetext is special to me.

My hypothesis is based on the feeling of being appreciated by your friends, family, and loved ones, which is something very powerful and can have a positive impact on your life. Anonymity creates a space where people feel less pressure to say something nice about others (no one is watching you). If you create a system where people can choose who to compliment, without any reward (other than the person possibly seeing it again one day), and there you have it. Since this is my first step into building social apps and websites, I hope you like it.

introducing **lovetext**.

### What is lovetext?

**lovetext** (stylize it as lowercase) is a web app that lets you save anonymous compliments to people you know. The recipient can't reply, can't see who sent it, and can't like it. You pick a compliment from a list, enter a phone number, and the message is saved anonymously. Every message anyone sends becomes a flower in a shared garden, a growing picture of all the kind things people have said to each other in the world since today, February 14th, 2026.

## Philosophy & UX

Most social apps reward you for being seen. Post something, get a reaction, post again. lovetext works differently. When you send a compliment, you get nothing back from the person who receives it. The only thing that happens is a flower appears in the garden. The act of being kind is the reward, not the response.

I think about this as content that stays forever. Every compliment lives in the garden permanently. Over time, this creates a slow effect: the more messages people send, the bigger the garden gets, and the more reason everyone has to come back and see it grow. It's not viral growth. It's something quieter.

The send flow keeps things simple. Instead of a blank text box asking "what do you want to say?", lovetext shows you a list of pre-written compliments as small pill buttons. You pick one, enter a phone number, and it's sent. After that, you can send another one.

Anonymity matters too. Sometimes the kindest thing you could say to someone is something you'd never say face to face. Being open is hard. Anonymity gives people permission to be honest.

### The Garden

The garden is probably my favorite part of lovetext. It's a single, shared space where every compliment from every user becomes a flower. The more people use loveText, the bigger the garden gets.

The layout uses a deterministic algorithm based on the golden angle spiral (phyllotaxis) but to make it a  heart shaped. By the way, something funny about this. Is that I first made the video, and then the website. So the heart shape was something I loved on the video production process and I changed the layout to make it a heart shape later.

The garden supports pan, zoom, and touch interactions. Flowers have a breathing animation synchronized across the canvas. When you tap a flower, it tells you when it was sent, not who sent it.

### Software Information

- **Project technology**: Next.js, React, TypeScript, Tailwind CSS, Supabase
- **Industry**: Social
- **Work Duration**: ≈2 weeks
- **Accessibility WCAG**: AA (2.1)
- **Version**: 0.1.0

## Features

- Send anonymous compliments by picking from a list of pre-written messages
- Shared garden where every compliment from every user becomes a flower
- Simple four-step send flow: pick, enter number, send, repeat
- No sign up needed, just open and send

## References

- <a href="https://nextjs.org/" target="_blank">Next.js</a>
- <a href="https://supabase.com/" target="_blank">Supabase</a>
- <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>
- <a href="https://zustand.docs.pmnd.rs/" target="_blank">Zustand</a>
- <a href="https://vercel.com/" target="_blank">Vercel</a>
