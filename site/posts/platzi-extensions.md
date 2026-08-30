---
title: PlatKey
date: "2021-12-30"
description: "Creating a multiplatform browser extension for Platzi"
tags:
  - chrome
  - browser
  - safari
  - extension
  - platzi
---

<img src="/platkey__cover.webp" alt="Landing page of Platkey" />

## Introduction

Some people like the experience of using web apps with keyboard shortcuts. <a href="https://platzi.com/" target="_blank">Platzi</a> is a platform that provides online courses, blogposts, live classes, and exams. The exams are taken in the browser, and the students can use the mouse to select the options. But now the students can use keyboard shortcuts to select the options faster.

Introducing **PlatKey**.

### What is PlatKey?

**PlatKey** is a browser extension that helps Platzi students to solve exams faster in Platzi. Also the browser extension provides new functionalities to improve the experience of taking classes in Platzi. And it is available in Chromium browsers and Safari.

### Software Information

- **Project technology**: JavaScript, HTML, CSS, Chrome API, Safari API
- **Industry**: Education
- **Work Duration**: ≈3 months
- **Accessibility WCAG**: AA (2.0)
- **Version**: 3.0

## Features

- Keyboard shortcuts to select exam options
- Keyboard shortcuts to navigate between classes
- Fully integrated whiteboard in the exam
- Highlight classes in the Student Home
- Save contributions in the Student Home
- Search for classes using a search bar
- Terminal-style design for Platzi UI
- Multiplatform: available in Chromium-based browsers and Safari

If you want to install the extension, you can do it from the <a href="https://platkey.dev/" target="_blank">PlatKey website</a>.

It is open-source and under MIT License, <a href="https://github.com/360macky/platkey" target="_blank">you can review the code in GitHub</a>.

## Design Process

The extension was made with an architecture that allows the extension to be used in different platforms. The first version of PlatKey was made for <a href="https://www.google.com/chrome/" target="_blank">Google Chrome</a> (and Chromium browsers). And the third version brings support for <a href="https://www.apple.com/safari/" target="_blank">Safari</a> browser.

## Development Process

### Creating the Keyboard Shortcuts Script

I explored **how exam options are structured at Platzi**. In addition to the available options for a question, we also have a "Skip question" button. Once identified, I created a function that would detect keystrokes, and if they match the 5 options (in letters and numbers), or with the number 0/X, an option would be selected or the question would be skipped respectively.

In addition, considering that the user is sure of the selected option, once an option is selected, that option is confirmed immediately (or at least less than a second later, since there is a delay until the button "Next question" is available)

### Developing the Extension Architecture

Once the keyboard shortcuts technology was created. I started to think about how to structure the extension.

#### Manifest Extension

I decided to use the <a href="https://developer.chrome.com/docs/extensions/mv3/intro/">Manifest V3</a> of Chrome. This version of the extension is more secure and has a better performance.

Manifest V3 has features like service workers to load the user configuration, and content scripts to execute the keyboard shortcuts script.

### UI Design

The user interface was designed to be simple and intuitive. Inspired by control panel in <a href="https://support.apple.com/guide/iphone/use-and-customize-control-center-iph59095ec58/ios" target="_blank">iOS</a>.

<img src="/platkey__comparison.webp" alt="Landing page of Platkey" />

The extension has a popup window that contains only the configuration of the extension and links to the PlatKey website. The `popup.js` file is the JavaScript code whose scope is in this window.

### Extension Workflow

The extension has a `content.js`, `spotlight.js`, and `content.js` files that are executed in background everytime the page is loaded for the `"https://platzi.com/*"`.

And when styles are required, the extension has a `page.css` file.

### Permissions

Every browser extension needs permissions to execute code in the browser. Theses permissions are defined in the `manifest.json` file.

The extension had more permissions in the Alfa version. But after the review of the extension in the Chrome Web Store Team, the extension only needs these permissions:

- `storage`: To store user configuration.
- `scripting`: To execute JavaScript scripts inside the page itself.

And only is executed in the `"https://platzi.com/*"` url.

## Challenges

Many challenges were faced during the development of PlatKey. Some of them were:

### Building Spotlight search

#### Situation

In order to achieve the Spotlight search feature, I needed to manipulate the DOM of the page. And I needed to do it in a way that does not affect the experience of the user by messing with the search functions, and preserving the accessibility and the UI established by Platzi.

#### Solution

There is a specific function to load the Spotlight search. This function is called only if the user activates the feature Spotlight.

After that, it creates a "Spotlight Wrapper" element (`#NewSearchSpotlight`) that will contain the Spotlight search. Using the `insertBefore` and `appendChild` methods:

```js
// src/scripts/spotlight.js
searchBar.parentNode.insertBefore(spotlightWrapper, searchBar);
spotlightWrapper.appendChild(searchBar);
```

In this point some styles are applied to the search bar and the wrapper. This styles will take the search bar at the top-center, and will hide it by default. (So the user can activate the Spotlight search by pressing the `Ctrl+K` or `Cmd+K`).

This step is applied 500ms after the page is loaded. This delay is to ensure that the search bar is loaded in the DOM.

### Safari Support

#### Situation

<a href="https://www.apple.com/safari/" target="_blank">Safari</a> is the second most used browser in the world according to <a href="https://gs.statcounter.com/browser-market-share" target="_blank">StatCounter</a>. And Safari has a lot of users in Mac OS. So I decided to make a version of PlatKey for Safari.

#### Solution

The process was straightforward. I used the <a href="https://developer.apple.com/documentation/safariservices/safari_web_extensions/converting_a_web_extension_for_safari" target="_blank">Safari Extension Builder</a> to transform the extension.

In Safari, the extension has a different architecture. For example, it includes a wizard-like window to configure the extension once it is installed.

After that, I uploaded the extension to the App Store only for Mac. And the extension was approved by the <a href="https://developer.apple.com/app-store/review/guidelines/" target="_blank">App Store Review Team</a>.

## License

The source code of PlatKey is distributed under the <a href="https://opensource.org/licenses/MIT" target="_blank">MIT License</a>.

## References

- <a href="https://chrome.google.com/webstore/detail/PlatKey/bdjedpeffgjikndcihipemgdinpcmpcf?hl=es-419" target="_blank">PlatKey Extension page</a>
- <a href="" target="_blank">PlatKey Website</a>
- <a href="" target="_blank">Chrome API</a>
- <a href="" target="_blank">Manifest V3</a>
- <a href="" target="_blank">Chrome Web Store Review</a>
