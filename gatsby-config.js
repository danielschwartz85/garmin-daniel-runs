/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  pathPrefix: '/garmin-view-runs/public', // will only be active aith --prefix-paths build flag.
  plugins: [
    // Load data json from fs :
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: 'gatsby-transformer-json',
      options: {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: `${__dirname}/src/data/`,
        },
      },
    },
    // Create manifest file (how to first install the page):
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'MyRuns',
        short_name: 'MyRuns',
        start_url: '/',
        background_color: '#fad28e',
        theme_color: '#fad28e',
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: 'standalone',
        icon: 'src/images/tracking.png', // This path is relative to the root of the site.
      },
    },
    // Create service worker (proxy between network and page for better offline capabilities)
    'gatsby-plugin-offline',
    // Site meta data
    'gatsby-plugin-react-helmet',
  ],
};
