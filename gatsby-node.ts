const path = require("path");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const showBlog = process.env.SHOW_BLOG;

const PAGES_QUERY = `
  query {
    site {
      siteMetadata {
        blogPostsCountPerPage
      }
    }
    allMdx(sort: { frontmatter: { date: DESC } }, limit: 1000) {
      nodes {
        id
        frontmatter {
          path # to create page address
          title # for SEO in page Head - title
          author # for SEO in page Head - author
          date(formatString: "MMMM DD, YYYY") # for SEO in page Head - date
        }
        excerpt(pruneLength: 250) # for SEO in page Head - description
        internal {
          contentFilePath
        }
      }
    }
  }
`;

exports.createPages = async ({ actions, graphql, ...rest }) => {
  const { createPage } = actions;

  if (showBlog === "true") {
    const result = await graphql(PAGES_QUERY);

    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`);
      return;
    }

    const { allMdx, site } = result.data;

    const posts = allMdx.nodes;
    const postsPerPage = site.siteMetadata.blogPostsCountPerPage;
    const numPages = Math.ceil(posts.length / postsPerPage);
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog` : `/blog/${i + 1}`, // Don't create /blog/0 and /blog/1
        component: path.resolve("./src/templates/blogListTemplate.tsx"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage + 1, // +1 because first shown is always the same single newest post
          numPages,
          currentPage: i + 1, // Starts indexing from page 1, there is no page 0
        },
      });
    });

    posts.forEach((node) => {
      const blogTemplate = path.resolve(`src/templates/blogTemplate.tsx`);

      createPage({
        path: node.frontmatter.path,
        component: `${blogTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
        context: {
          id: node.id,
          title: node.frontmatter.title,
          excerpt: node.excerpt,
          author: node.frontmatter.author,
          date: node.frontmatter.date,
        },
      });
    });
  }
};
