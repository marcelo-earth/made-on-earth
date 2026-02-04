module.exports = {
  name: "Made on Earth",
  shortDesc:
    "Every product has a process with challenges. Here I share the stories behind each one.",
  url: "https://made.marcelo.earth/",
  authorEmail: "hello@marceloarias.com",
  authorHandle: "@marcelo_earth",
  authorName: "Marcelo Arias",
  postsPerPage: 6,
  socialImage: "/social/thumbnail.png",
  theme: {
    primary: {
      background: "white",
      text: "black",
      highlight: "#666",
    },
    secondary: {
      background: "#1b1f25",
      text: "#8ea6fa",
      highlight: "#666",
    },
  },

  keystone: {
    comments: true,
    bookmarks: true,
    claps: true,
    login: true,
  },
  // Critical CSS results in much slower build times and uses a lot of system resources
  // turn on in production :)
  // See `site/transforms/critical-css-transform.js` for more details
  criticalCSS: false,
};
