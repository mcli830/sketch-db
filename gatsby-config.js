module.exports = {
  siteMetadata: {
    title: `Sketch DB`,
    description: `Create relational database mockups.`,
    author: `mcli830`,
    authorPage: `https://github.com/mcli830`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sketch DB`,
        short_name: `sketch-db`,
        start_url: `/`,
        background_color: `#444`,
        theme_color: `#444`,
        display: `minimal-ui`,
        // icon: `src/images/favicon.ico`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
