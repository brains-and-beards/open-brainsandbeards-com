import type { GatsbyConfig } from 'gatsby'

const marked = require('marked')

const { slashify } = require('./src/helpers/path_helpers')

const { NODE_ENV, CONTEXT: NETLIFY_ENV = NODE_ENV } = process.env

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Home',
    titleTemplate: '%s · Brains & Beards',
    description:
      'Brains & Beards is an unpretentious mobile studio that solves business problems through a mix of design and technology.',
    siteUrl: 'https://brainsandbeards.com',
    url: 'https://brainsandbeards.com',
    // No trailing slash allowed!
    image: 'favicon.png',
    // Path to your image you placed in the 'static' folder
    twitterUsername: '@brainsandbeards',
    blogPostsCountPerPage: 12
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
        }
      `,
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: '*' }],
            sitemap: 'sitemap-index.xml'
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null
          }
        }
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
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
            }
          }
        }
      `,
        resolveSiteUrl: ({ site }) => site.siteMetadata.siteUrl,
        resolvePages: ({ allSitePage: { nodes: allPages }, allMdx: { nodes: allMdxNodes } }) => {
          const blogPostsMap = allMdxNodes.reduce((acc, node) => {
            const { uri } = node
            acc[uri] = node

            return acc
          }, {})

          return allPages.map(page => {
            return { ...page, ...blogPostsMap[page.path] }
          })
        },
        serialize: ({ path, modifiedGmt }) => {
          return {
            url: slashify(path),
            changefreq: 'daily',
            priority: 0.7,
            lastmod: modifiedGmt
          }
        }
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              ignoreFileExtensions: ['png', 'jpg', 'jpeg', 'bmp', 'tiff']
            }
          },
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              //   showInfo: false, // Optional: Hides video title and player actions.
              // loadingStrategy: "lazy", //Optional: Enable support for lazy-load offscreen iframes. Default is disabled.
              containerClass: 'embedVideo-container', //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
              iframeId: false //Optional: if true, iframe's id will be set to what is provided after 'video:' (YouTube IFrame player API requires iframe id)
              // sandbox: "allow-same-origin allow-scripts allow-presentation", // Optional: iframe sandbox options - Default: undefined
            }
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200
            }
          },
          'gatsby-remark-responsive-iframe' //Optional: Must be loaded after gatsby-remark-embed-video
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          placeholder: 'blurred'
        }
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets/illustrations`,
        name: 'illustrations'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets/testimonials`,
        name: 'testimonialsAssets'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets/case-studies`,
        name: 'caseStudiesAssets'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets/team`,
        name: 'teamAssets'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets/images/blogAuthors`,
        name: 'blogAuthorsAssets'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/'
      },
      __key: 'images'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/'
      },
      __key: 'pages'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blogposts',
        path: './content/blog/'
      },
      __key: 'blogposts'
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          omitKeys: [
            'xmlnsDc',
            'xmlnsCc',
            'xmlnsRdf',
            'xmlnsSvg',
            'xmlnsSodipodi',
            'xmlnsInkscape',
            'rdfAbout',
            'rdfResource'
          ]
        }
      }
    },
    {
      resolve: 'gatsby-plugin-anchor-links',
      options: {
        offset: -100
      }
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint:
          'https://brainsandbeards.us10.list-manage.com/subscribe/post?u=1866d0ed0d86fc67762d34be5&amp;id=7080aab9c0'
      }
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
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map(node => {
                const url = site.siteMetadata.siteUrl + node.frontmatter.path
                const {
                  image: { size, extension, childImageSharp }
                } = node.frontmatter

                const imageUrl = childImageSharp
                  ? site.siteMetadata.siteUrl + childImageSharp.fixed.src
                  : null

                return Object.assign({}, node.frontmatter, {
                  author: node.frontmatter.author,
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: slashify(url),
                  guid: slashify(url),
                  enclosure: {
                    url: imageUrl,
                    size,
                    type: 'image/' + extension
                  },
                  custom_elements: [
                    {
                      'content:encoded': marked.parse(node.body)
                    }
                  ]
                })
              })
            },
            query: `
              {
                allMdx(sort: {frontmatter: {date: DESC}}, limit: 15) {
                  nodes {
                    excerpt
                    frontmatter {
                      title
                      date
                      image {
                        size
                        extension
                        childImageSharp{
                          fixed(
                            height: 200
                            width: 280
                            quality: 90
                          ) {
                            src
                          }
                        }
                      }
                      path
                      author
                    }
                    body
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
              media: 'http://search.yahoo.com/mrss/'
            },
            custom_elements: [
              {
                'webfeeds:logo': 'https://brainsandbeards.com/favicon.png'
              },
              {
                'webfeeds:cover': {
                  _attr: {
                    image: 'https://brainsandbeards.com/favicon.png'
                  }
                }
              },
              {
                'webfeeds:accentColor': 'FFDE1A'
              }
            ],
            categories: ['Technology', 'Programming']
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: '1',
        matomoUrl: 'https://brainsandbeards.matomo.cloud',
        siteUrl: 'https://brainsandbeards.com',
        disableCookies: true
      }
    }
    // 'gatsby-plugin-react-native-web',
  ]
}

export default config
