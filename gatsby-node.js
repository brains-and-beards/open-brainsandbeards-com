const path = require('path')
// const { createFilePath } = require(`gatsby-source-filesystem`)

// require('dotenv').config({
//   path: `.env.${process.env.NODE_ENV}`,
// })
// const showBlog = process.env.SHOW_BLOG

exports.createPages = async ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions

  createRedirect({
    fromPath: '/jobs',
    toPath:
      'https://brains-and-beards.notion.site/Job-offers-at-Brains-Beards-1b21951978bd4a11b9b03b5fbf0021c1',
    redirectInBrowser: true,
  })

//   if (showBlog !== 'true') return
//   return graphql(`
//     {
//       allMarkdownRemark(
//         sort: { order: DESC, fields: [frontmatter___date] }
//         limit: 1000
//       ) {
//         edges {
//           node {
//             frontmatter {
//               path
//             }
//           }
//         }
//       }
//     }
//   `).then((result) => {
//     if (result.errors) {
//       return Promise.reject(result.errors)
//     }

//     result.data.allMarkdownRemark.edges.forEach(({ node }) => {
//       const template = path.resolve(`src/templates/blogTemplate.js`)
//       createPage({
//         path: node.frontmatter.path,
//         component: template,
//         context: {}, // additional data can be passed via context
//       })
//     })

//     const posts = result.data.allMarkdownRemark.edges
//     const postsPerPage = 12
//     const numPages = Math.ceil(posts.length / postsPerPage)
//     Array.from({ length: numPages - 1 }).forEach((_, i) => {
//       createPage({
//         path: `/blog/${i + 2}`, // Don't create /blog/0 and /blog/1
//         component: path.resolve('./src/templates/blog.js'),
//         context: {
//           page: i + 2,
//           numPages,
//           limit: postsPerPage,
//           skip: (i + 1) * postsPerPage + 1,
//         },
//       })
//     })

//     // Manually create the first page with a different path
//     createPage({
//       path: `/blog`,
//       component: path.resolve('./src/templates/blog.js'),
//       context: {
//         page: 1,
//         numPages,
//         limit: postsPerPage,
//         skip: 1,
//       },
//     })
//   })
}



// DELETE BELOW

// exports.onCreatePage = ({ page, actions }) => {
//   const { createPage, deletePage } = actions

//   if (path.resolve('./src/pages/index.js') === page.component) {
//     deletePage(page)
//     createPage({
//       ...page,
//       context: {
//         ...page.context,
//         testimonialsItems: `[${testimonials.map(it => `\"/${it.relativePathRegex}/\"`).join(', ')}]`,
//       },
//     })
//   }
// }
