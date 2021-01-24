const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-caches-gatsby-plugin-offline-app-shell-js": hot(preferDefault(require("/home/daniel/dev/garmin-view-runs2/.cache/caches/gatsby-plugin-offline/app-shell.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/home/daniel/dev/garmin-view-runs2/src/pages/index.js")))
}

