---
title: Graphem
date: "2022-09-30"
description: "Creating a plugin for NASA's visualization framework"
tags:
  - nasa
  - graphql
  - typescript
  - npm
  - openmct
  - artemis
---

<img src="/graphem__cover.webp" alt="Landing page of Graphem" />

## Introduction

<a href="https://software.nasa.gov/software/ARC-15256-1D" target="_blank">NASA Open MCT</a> is a web-based mission control framework for visualizing <a href="https://en.wikipedia.org/wiki/Telemetry" target="_blank">telemetry of space missions</a>. It allows <a href="https://nasa.github.io/openmct/plugins/" target="_blank">plugins</a> to be developed to extend its functionality. One of the cases that can be developed is to visualize telemetry data from a source that is different from the default ones. In this case, I developed an experimental plugin that allows you to visualize telemetry data from a <a href="https://graphql.org/" target="_blank">GraphQL</a> endpoint.

Introducing **Graphem**.

## What is Graphem?

**Graphem**, a plugin that allows viewing telemetry data in NASA Open MCT directly from a GraphQL server.

### Software Information

- **Project technology**: TypeScript, GraphQL, NPM, NASA Open MCT
- **Industry**: Space Exploration
- **Work Duration**: ≈3 months
- **Version**: 2.0

## Features

- Visualize telemetry data from a GraphQL endpoint
- Documentation of the plugin
- Customizable with the plugin architecture of NASA Open MCT

## Background

**Artemis 1** was an uncrewed Moon-orbiting mission. I wanted to visualize the telemetry data of this mission in NASA Open MCT. If all the information is available from a GraphQL endpoint, it is possible to visualize it in NASA Open MCT thanks to the plugin developed. Which is awesome!

I collected the telemetry data from the <a href="https://ssd.jpl.nasa.gov/horizons/app.html#/" target="_blank">Horizons System</a>. Then I created a GraphQL server to expose the telemetry data.

You can access this project on <a href="https://github.com/360macky/graphem-template-app" target="_blank">Graphem Template App</a>.

## Design Process

The design of the solution was based on capturing the telemetry data from a GraphQL endpoint and then displaying it in NASA Open MCT. The structure is defined by the <a href="https://nasa.github.io/openmct/plugins-documentation/" target="_blank">NASA Open MCT plugin architecture</a>. The plugin is made up of a part to integrate domain objects with object provider and composition provider. Then require the historical data, to display it on the screen, and finally require the real-time data continuously to link them on the same screen.

GraphQL offers a query language that allows you to request data from a server. The query language is based on the concept of types and fields. And also offers a real-time subscription mechanism to receive data from the server. The data is returned in <a href="https://www.json.org/json-en.html"  target="_blank">JSON format</a>. Graphem applies this concept to the NASA Open MCT plugin architecture.

## Development Process

### Building a basic plugin

The development of Graphem began by generating a prototype of how to build a plugin that obtains basic <a href="https://graphql.org/learn/queries/" target="_blank">GraphQL queries</a>. Although I was able to use the <a href="https://www.apollographql.com/docs/react/" target="_blank">Apollo client</a>, I preferred to use the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" target="_blank">fetch API</a> to get more lightness in the plugin.

NASA Open MCT provides documentation on how to develop plugins. The tutorial <a href="https://nasa.github.io/openmct/getting-started/" target="_blank">NASA Spacecraft</a> teaches how to develop a plugin that allows you to visualize telemetry data from a HTTP/<a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" target="_blank">WebSockets</a> server. This tutorial was used as a basis for the development of Graphem.

After a few tests, I was able to obtain the telemetry data from a GraphQL endpoint and display it in NASA Open MCT. The next step was to integrate real-time data.

### Integrating real-time data

In this part I have to extend the functionality of the server. The server must be able to send telemetry data in real-time. As I mentioned before, GraphQL offers a subscription mechanism to receive data from the server. But at the time multiple solutions came out to implement this mechanism.

### A plugin with Type checking

NASA Open MCT does not support <a href="https://www.typescriptlang.org" target="_blank">TypeScript</a>. But for a better development experience this plugin was built on it. The first step was to create a <a href="" target="_blank">TypeScript configuration file</a>. This file is used to configure the TypeScript compiler. The configuration file is called `tsconfig.json` and is located in the root of the project.

Currently there is an iniative to add Types support for NASA Open MCT. You can follow the progress in [this issue].

### Integrating to NPM package

Once the plugin was ready, it was time to integrate it into a NPM package. For better integration with the Graphem package it uses <a href="https://rollupjs.org/guide/en/" target="_blank">RollUp</a>, a module bundler, in the same style as <a href="" target="_blank">Open MCT YAMCS</a>. Thanks to this same configuration, it will export a file in Universal Module Definition (UMD).

### Publishing the package to NPM

The package is published to NPM. And, it can be installed with `npm i graphem`. Or, using Yarn, `yarn add graphem`.

### Installing with the Open MCT Build Tool

<a href="https://github.com/nasa/openmct-build" target="_blank">`mct`</a> is NASA's command line tool for assembling a packaged Open MCT deployment. In <a href="https://github.com/360macky/graphem/pull/7" target="_blank">this pull request</a> I added support for it, so Graphem can be installed and configured as a plugin without hand wiring a `<script>` tag and an `openmct.install()` call.

The work involved pointing the `main` field at the built UMD bundle, declaring the package as CommonJS so `mct` picks the right install shim, and adding an `openmct` optional peer dependency to record version compatibility. Graphem also ships a recipe file, so a full instance with the plugin already wired in can be built in one command.

```bash
mct build -i graphem-demo
mct plugins add graphem -i graphem-demo
mct plugins configure graphem --options '{"urn": "telemetry.example.com/graphql"}' -i graphem-demo
```

Or, straight from the bundled recipe:

```bash
mct build --recipe recipes/graphem.yaml -i graphem-demo
```

### Publishing the plugin on NASA Open MCT Community Plugins

An email was sent to the NASA Open MCT community to publish the plugin on the <a href="https://nasa.github.io/openmct/plugins/" target="_blank">Community Plugins</a> section.

Currently the plugin is not published on the NASA Open MCT Community Plugins section. But soon it will be.

### Creating the landing page of Graphem

Finally, a landing page was created to show the features of the plugin. The landing page is available at <a href="https://graphem.space/" target="_blank">Graphem.space</a>. Built with <a href="https://astro.build" target="_blank">Astro</a>, a static site generator for modern web apps, and <a href="https://tailwindcss.com" target="_blank">Tailwind CSS</a>, a utility-first CSS framework.

## Challenges

Many challenges were faced during the development of Graphem. Some of them were:

### Packaging the plugin

#### Situation

A plugin in <a href="https://nasa.github.io/openmct/plugins-documentation/" target="_blank">NASA Open MCT</a> is essentially a JavaScript function that it is passed by an `install` function.

#### Solution

I started looking for other plugins that were already published and its architecture. I adopted the same architecture as the <a href="https://github.com/evenstensberg/yamcs-openmct-plugin">Open MCT YAMCS</a> plugin. This plugin uses <a href="https://rollupjs.org/guide/en/" target="_blank">RollUp</a> to package the plugin.

So I created a new <a href="https://rollupjs.org/guide/en/" target="_blank">RollUp</a> configuration file. This file is called `rollup.config.js` and is located in the root of the project. Using a CommonJS module, I exported the configuration of the plugin.

## License

The source code of Graphem is distributed under the <a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache 2.0</a>. This license is compatible with Open MCT.

## References

- <a href="https://code.nasa.gov/" target="_blank">NASA Open Source Software</a>
- <a href="https://nasa.github.io/openmct/" target="_blank">NASA Open MCT</a>
- <a href="https://graphql.org/" target="_blank">GraphQL</a>
- <a href="https://www.apollographql.com/docs/react/" target="_blank">Apollo client</a>
- <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" target="_blank">fetch API</a>
- <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>
- <a href="https://rollupjs.org/guide/en/" target="_blank">RollUp</a>
- <a href="https://github.com/akhenry/openmct-yamcs" target="_blank">Open MCT YAMCS</a>
- <a href="https://www.oreilly.com/library/view/building-enterprise-javascript/9781788477321/03979156-167c-4598-85e8-0544241e2aed.xhtml" target="_blank">Universal Module Definition</a>
- <a href="https://astro.build/" target="_blank">Astro</a>
- <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>
