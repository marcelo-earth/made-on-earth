---
title: DailyFast
date: "2026-08-31"
description: "A daily check on whether your website is fast, accessible, visible, and reliable, with the fix already written"
tags:
  - web
  - nextjs
  - supabase
  - artificial intelligence
  - mcp
  - seo
---

<img src="/dailyfast__cover.webp" alt="Landing page of DailyFast" />

## Introduction

With much love ❤️ to all of you.

Website problems don't wait for you to find them. A link rots and takes a sale with it. A meta tag goes missing and the page quietly drops in search. A page gets a little slower every deploy until people stop waiting for it. None of these announce themselves. You find out weeks later, by accident, usually because you were looking for something else.

I kept living this on my own projects. I knew how to fix every one of those things. What I didn't have was anything telling me they were happening. Checking a site by hand every morning is the kind of task that sounds cheap and never survives contact with a real week.

So I made **DailyFast**.

### What is DailyFast?

DailyFast checks your website every day for SEO gaps, accessibility issues, performance problems, and AI visibility, which means how tools like <a href="https://chatgpt.com/" target="_blank">ChatGPT</a> talk about you compared to your competitors. Every finding arrives with a prompt written to be pasted straight into <a href="https://claude.com/product/claude-code" target="_blank">Claude Code</a>, <a href="https://cursor.com/" target="_blank">Cursor</a>, or <a href="https://openai.com/codex/" target="_blank">Codex</a>, so the fix costs you one paste instead of an afternoon.

It lives at <a href="https://dailyfa.st" target="_blank">dailyfa.st</a>.

## Deterministic first, AI second

The most important design decision in the whole product is what the language model is *not* allowed to do.

Around forty checks run as plain code against the fetched HTML. Page title present and under seventy characters. Meta description under a hundred and sixty. The three Open Graph tags. Twitter card. One H1. Viewport. Canonical. `lang` on the `<html>` element. JSON-LD. Images with alt text, with width and height, with `loading`, in a modern format. Mixed content. Render-blocking scripts and stylesheets in the head. Preconnect hints for external origins. Inline CSS size. Document size. Heading hierarchy with no skipped levels. Form labels, ARIA landmarks, descriptive link text, a skip navigation link, button labels, character encoding, whether indexing is even allowed. Then total fetch time.

Every one of them is a regular expression and a comparison. No model involved. That matters more than it sounds: these are the checks that must give the same answer today and tomorrow, because the entire product is a comparison against yesterday. A check that drifts is worse than no check, since it manufactures a change that never happened.

The model only runs after all of that, and it gets told what already failed:

```
The following technical issues have already been detected. Do NOT repeat them:
- Meta Description: Missing, search engines will auto-generate one
- H1 Heading: Missing, add a primary heading
```

Then it's asked for exactly one issue, the highest impact one, and explicitly steered away from meta tags, SEO basics, and security headers, because those are covered. What's left is the part code can't judge: whether a visitor understands what this thing does, whether the call to action is findable, whether the pricing page explains the difference between tiers. The prompt also changes with the site's purpose, so a portfolio gets asked about how browsable the work is, and a SaaS gets asked about trial friction and feature communication.

Each issue comes back as a structured object through <a href="https://ai-sdk.dev/" target="_blank">Zod</a>: a `rule` stating the general principle, a `description` pointing at the actual element on this page, and a `fix` written as a prompt with a real decision inside it. Not "improve the headline". Something closer to "change the headline to X and add a subtitle explaining Y". A vague fix just moves the thinking back onto the person, which is the thing I was trying to remove.

There's one more field, and it's my favorite: a `followUp` question with two to four options, each carrying its own tailored version of the fix. The model doesn't know if you offer a free trial, and guessing makes the prompt worse. So it asks, in one sentence, about your business rather than the code, and the answer swaps in a different prompt. It turns a report into something closer to a short conversation.

## Asking ChatGPT about you, twice

People ask AI assistants for product recommendations now, in the same breath they used to type into a search box. So AI visibility became its own daily job, and it runs in two modes.

**Blind mode** takes five realistic queries someone would ask about your category, generated from your site's metadata, and just asks them. No mention of your product. Then it string-matches your brand names against the answer. This is the honest measurement: with no help at all, do you come up? It runs ten times per query, because a model asked the same question twice will not always answer the same way, and one sample is an anecdote.

**Choose mode** puts you in a list with your competitors and asks the model to pick one and explain why. Two details make this trustworthy. The options are shuffled with Fisher-Yates before every run, so position can't be what wins. And the list carries only name and domain, never descriptions, because the queries were generated from your own site copy, and including descriptions would let the model match your marketing text against a query written from your marketing text. It would score beautifully and mean nothing. That comment in the code is a note to my future self about a result I almost believed.

Ten repetitions each, batched ten at a time to stay inside rate limits. The output isn't a vibe, it's a rate: mentioned in three of five queries, ranked first in two, two left to improve, plus the model's own stated reason for picking whoever it picked. That reason is usually the most actionable line in the report.

## The report is the product

Everything above is plumbing for one email that arrives in the morning.

The schedule is four <a href="https://vercel.com/docs/cron-jobs" target="_blank">Vercel</a> cron jobs in a deliberate order: AI visibility at 15:00 UTC, website insights at 15:30, the report at 16:00, and an email dispatcher every hour on the hour. Half an hour of slack between each stage, so the report is never assembled from a scan that hasn't finished. Delivery goes through <a href="https://resend.com/" target="_blank">Resend</a>, in English or Spanish.

Every finding has a copy button that takes the whole context with it, not just the title. That button is the actual handoff between the product and your editor, and it's why the schema spends so much effort on the `fix` field. DailyFast is not trying to fix your site. It's trying to write the sentence that makes your agent fix your site correctly on the first try.

## MCP, free tools, and a leaderboard

Three surfaces grew around the core, and each one exists for a different reason.

The **MCP server** exposes the same data over the <a href="https://modelcontextprotocol.io/" target="_blank">Model Context Protocol</a>, so any MCP client can read experiments, results, analytics overviews, time series, revenue, users, and project settings without anyone opening a dashboard. If your agent is already fixing the site, it should be able to ask what's wrong without you relaying it.

The **free tools** are fourteen single-purpose checkers, each on its own page: agent usability test, OpenGraph checker, accessibility foundations, page speed, sitemap, JSON-LD, broken links, breadcrumbs, favicon and Apple touch icon generator, and more. They're honest utilities and they're also the top of the funnel. Someone arrives for one answer about one page, and the pitch for daily monitoring is simply that this check could run every morning instead of when they remember.

The **leaderboard** ranks scanned sites by accessibility, agent usability, discoverability, and speed. Agent usability is the category I find most interesting, because it's new: `robots.txt`, `llms.txt`, whether content is reachable as Markdown, structured signals. Whether a site is legible to a machine reading it on someone's behalf. Sites that rank get an embeddable badge, which is a link back, which is distribution that doesn't cost anything.

## Development

### Architecture

DailyFast is a <a href="https://nextjs.org/" target="_blank">Next.js</a> 16 app with React 19 and TypeScript, styled with Tailwind CSS 4 and deployed on Vercel. <a href="https://supabase.com/" target="_blank">Supabase</a> handles auth and PostgreSQL. Billing is <a href="https://stripe.com/" target="_blank">Stripe</a>, with prices localized by country, detected on the client and charged in the local currency. The site ships in English and Spanish through `next-intl`.

The scans and the report run on Azure OpenAI through the AI SDK, using a small, cheap model. This is a case where the small model is the right call rather than a compromise. The hard reasoning already happened in the deterministic checks; what's left is writing one clear paragraph, which a nano model does well, at a cost per user per month that rounds to nothing. A product that runs every day for every project has to have a per-run cost close to zero or the pricing stops working.

### One database, two products

DailyFast started in May 2026, and it shares a Supabase project with another product of mine. Auth and the tables both need live in `public`. Everything specific to DailyFast lives in its own `monitoring` schema, and the other product's tables live in a schema of their own.

Sharing a database between two products has one rule that has to hold: any migration touching `public` gets mirrored in both repos in the same session, and migration filenames use a global timestamp prefix rather than a sequential number, so two repos can't collide on the same number. It's a small discipline that keeps a shared foundation from becoming the reason you stop shipping in either product.

### Mobile

There's an <a href="https://expo.dev/" target="_blank">Expo</a> app with sites, alerts, overview, and profile, plus home screen widgets for site health, page speed, and AI fix activity. A daily product should be able to tell you the score without asking you to open anything, and a widget is the shortest distance between the scan and your attention.

### Software Information

- **Project technology**: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Supabase, Stripe, Expo
- **Industry**: Developer tools
- **Work Duration**: ~4 months
- **Platform**: Web, iOS, Android
- **Status**: Early access

## Features

- About forty deterministic daily checks across SEO, performance, and accessibility
- AI visibility measured in blind mode and choose mode, ten repetitions each
- Every finding ships with a copy-paste prompt for your AI coding tool
- Follow-up questions that tailor the fix to your business
- One prioritized email every morning, in English or Spanish
- MCP server for reading monitoring data from any AI tool
- Fourteen free single-purpose checkers
- Public leaderboard with embeddable badges
- Mobile app with home screen widgets

## Future Improvements

- A CLI (`dailyfast`, aliased `df`) wrapping the same REST API, so checks can run in CI and fail a build on a serious regression. The MCP server covers AI-native tools well, but piping output to `jq` and scripting it is a different need.
- More check categories, especially around agent usability, which is moving faster than the rest.

## References

- <a href="https://nextjs.org/" target="_blank">Next.js</a>
- <a href="https://supabase.com/" target="_blank">Supabase</a>
- <a href="https://ai-sdk.dev/" target="_blank">AI SDK</a>
- <a href="https://modelcontextprotocol.io/" target="_blank">Model Context Protocol</a>
- <a href="https://resend.com/" target="_blank">Resend</a>
- <a href="https://expo.dev/" target="_blank">Expo</a>
