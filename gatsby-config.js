const { slashify } = require('./src/helpers/path_helpers')

module.exports = {
  siteMetadata: {
    title: 'Home',
    siteUrl: 'https://brainsandbeards.com',
    titleTemplate: '%s · Brains & Beards',
    description:
      'Brains & Beards is an unpretentious mobile studio that solves business problems through a mix of design and technology.',
    url: 'https://brainsandbeards.com',
    // No trailing slash allowed!
    image: 'favicon.png',
    // Path to your image you placed in the 'static' folder
    twitterUsername: '@brainsandbeards',
  },
  plugins: [
    'gatsby-plugin-next-seo',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map((edge) => {
            const { path } = edge.node
            return {
              url: `${site.siteMetadata.siteUrl}${slashify(path)}`,
              changefreq: 'daily',
              priority: 0.7,
            }
          }),
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                const url =
                  site.siteMetadata.siteUrl + edge.node.frontmatter.path
                const {
                  image: { size, extension, childImageSharp },
                } = edge.node.frontmatter

                const imageUrl = childImageSharp
                  ? site.siteMetadata.siteUrl + childImageSharp.fixed.src
                  : null

                return Object.assign({}, edge.node.frontmatter, {
                  author: edge.node.frontmatter.author,
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: slashify(url),
                  guid: slashify(url),
                  enclosure: {
                    url: imageUrl,
                    size,
                    type: 'image/' + extension,
                  },
                  custom_elements: [
                    {
                      'media:content': {
                        _attr: {
                          height: 300,
                          medium: 'image',
                          url: imageUrl,
                        },
                      },
                      'media:content': edge.node.html,
                    },
                  ],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      frontmatter {
                        title
                        date
                        image {
                          size
                          extension
                          childImageSharp{
                            fixed(
                              height: 200
                              width: 270
                              quality: 90
                            ) {
                              src
                            }
                          }
                        }
                        path
                        author
                      }
                    }
                  }
                }
              }
            `,
            output: '/blog/feed.xml',
            title: 'Brains & Beards Insights',
            image_url: 'https://brainsandbeards.com/favicon.png',
            feed_url: 'https://brainsandbeards.com/blog/feed.xml',
            site_url: 'https://brainsandbeards.com',
            custom_namespaces: {
              webfeeds: 'http://webfeeds.org/rss/1.0',
              media: 'http://search.yahoo.com/mrss/',
            },
            custom_elements: [
              {
                'webfeeds:logo': 'https://brainsandbeards.com/favicon.png',
              },
              {
                'webfeeds:cover': {
                  _attr: {
                    image:
                      'https://brainsandbeards.com/static/a0fa7ff82c8900c764ad1d0678a8d1de/b8661/hero-bicycle.png',
                  },
                },
              },
              {
                'webfeeds:accentColor': 'FFDE1A',
              },
            ],
            categories: ['Technology', 'Programming'],
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './src/assets/images/favicon.png',
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false,
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages/markdown`,
        name: 'markdown-pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets/illustrations`,
        name: 'illustrations',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets/photos`,
        name: 'photos',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets/images`,
        name: 'photos',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets/case-studies`,
        name: 'case-studies',
      },
    },
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          placeholder: 'tracedSVG',
        },
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-remark-images',
      options: {
        maxWidth: 890,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 890,
              showCaptions: true,
              backgroundColor: 'transparent',
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              ignoreFileExtensions: ['png', 'jpg', 'jpeg', 'bmp', 'tiff'],
            },
          },
          {
            resolve: 'gatsby-remark-better-embed-video',
            options: {
              width: 800,
              ratio: 1.77,
              // Optional: Defaults to 16/9 = 1.77.
              height: 400,
              // Optional: Overrides optional.ratio.
              related: false,
              // Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true,
              // Optional: Disable insertion of <style> border: 0.
              showInfo: false, // Optional: Hides video title and player actions.
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: 'superscript',
                  extend: 'javascript',
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              prompt: {
                user: 'root',
                host: 'localhost',
                global: false,
              },
              escapeEntities: {},
            },
          },
          'gatsby-remark-responsive-iframe',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-anchor-links',
      options: {
        offset: -100,
      },
    },
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: '1',
        matomoUrl: 'https://brainsandbeards.matomo.cloud',
        siteUrl: 'https://brainsandbeards.com',
        disableCookies: true,
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint:
          'https://brainsandbeards.us10.list-manage.com/subscribe/post?u=1866d0ed0d86fc67762d34be5&amp;id=7080aab9c0',
      },
    },
    'gatsby-plugin-react-native-web',
  ],
}
