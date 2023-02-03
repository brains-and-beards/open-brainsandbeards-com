const path = require('path')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const showBlog = process.env.SHOW_BLOG

exports.createPages = async ({ actions, graphql, ...rest }) => {
  const { createPage, createRedirect } = actions

  createRedirect({
    fromPath: '/jobs',
    toPath:
      'https://brains-and-beards.notion.site/Job-offers-at-Brains-Beards-1b21951978bd4a11b9b03b5fbf0021c1',
    redirectInBrowser: true,
  })

  if (showBlog === 'true') {
    const result = await graphql(`
    {
      site {
        siteMetadata {
          blogPostsCountPerPage
        }
      }
      allMdx(
        sort: { frontmatter: { date: DESC }}
        limit: 1000
      ) {
        nodes {
          frontmatter {
            path
          }
        }
      }
    }`)

    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }

    const { allMdx, site } = result.data

    const posts = allMdx.nodes
    const postsPerPage = site.siteMetadata.blogPostsCountPerPage
    const numPages = Math.ceil(posts.length / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog` : `/blog/${i + 1}`,  // Don't create /blog/0 and /blog/1
        component: path.resolve("./src/templates/blogListTemplate.js"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1, // Starts indexing from page 1, there is no page 0
        },
      })
    })

    posts.forEach((node) => {
      const template = path.resolve(`src/templates/blogTemplate.js`)
      createPage({
        path: node.frontmatter.path,
        component: template,
        context: {}, // additional data can be passed via context
      })
    })
  }
}
