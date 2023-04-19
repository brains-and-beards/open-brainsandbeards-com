import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import Swiper from '../components/Homepage/References/Swiper'
import Layout from '../templates/layout'
import SEO from '../components/shared/layout/SEO'
import TeamMember from '../components/Team/TeamMember'
import ContactForm from '../components/Contact/forms/ContactForm'
import PictureListItem from '../components/shared/PictureListItem'
import Testimonial from '../components/CaseStudies/Testimonial'

let teamMembers = [
  {
    name: 'Patryk',
    photo: 'patryk.jpg',
    bio: 'Ideas machine. Reading too much. Teaching (functional) mobile and desktop development. I do funny faces on YouTube.',
  },
  {
    name: 'Wojciech',
    photo: 'wojtek.jpg',
    bio: 'Polyglot software developer. Climber. Interested in renewable energy, electric vehicles, and reforestation. The easiest way to pronounce my name is: boy - tech.',
  },
  {
    name: 'Marek',
    photo: 'marek.jpg',
    bio: 'React Native developer with Ruby on Rails backend experience. Ex-chemist. Enjoys climbing and travelling to remote places.',
  },
  {
    name: 'Szymon',
    photo: 'szymon.jpg',
    bio: 'React Native developer with native Android and iOS experience. Always curious and eager to try new technologies. Often tinkers with electronics or rides a bike.',
  },
  {
    name: 'Łukasz',
    photo: 'lukasz.jpg',
    bio: 'React Native developer with web experience. Enthusiast of functional programming. Always on the lookout for performance gains, never stops asking why. Can be found skating down the streets.',
  },
  {
    name: 'Błażej',
    photo: 'blazej.jpg',
    bio: 'Mobile apps developer. He fell in love with React Native. Self-improver, golf enthusiast. In his house you can always count on being welcomed with a good Scotch.',
  },
  {
    name: 'This could be you',
    photo: 'open-positions.jpg',
    bio: 'Ready to take the next step in your career? Drop us a message to see if you could join our team.',
  },
]

const title = 'Team'
const description =
  "Technology is never enough to solve a problem. You'll need a team of experienced and caring developers as well. How about ours?"

class TeamPage extends Component {
  render() {
    const {
      versatilityIcon,
      reliabilityIcon,
      diversityIcon,
      testimonialImage,
      teamImages,
    } = this.props.data

    const teamMembersWithImages = teamMembers.map((it) => {
      const image = teamImages.nodes.find(
        (file) => file.relativePath === it.photo
      )
      return {
        ...it,
        image,
      }
    })

    return (
      <Layout headerTitle={title} headerSub={description}>
        <div className="content-page">
          <div className="big-part-yellow">
            <div className="content members-box">
              {teamMembersWithImages.map((member) => (
                <TeamMember {...member} key={member.name} />
              ))}
            </div>
            <div className="mobile-only team-swiper">
              <Swiper ContentClass={TeamMember} items={teamMembersWithImages} />
            </div>
          </div>

          <Testimonial
            quote="It was a pleasure working at Brains & Beards - a company where everyone is treated equally, fairly, and without discrimination. There was always time to develop yourself. I developed amazingly working with everyone on the team and gained valuable experience as a remote software engineer. In addition, my colleagues were always approachable and I'd always be eager to start a new working day."
            image={testimonialImage}
            name="Natalia Majkowska-Stewart"
            position="React Native Developer"
            company="Brains & Beards"
          />

          <div className="narrow-column team-traits">
            <p className="quote center">
              Above you saw a few words about each of us, but what's important
              are the qualities we all share. Here are a few traits that we
              consider vital:
            </p>
            <ul className="picture-list">
              <PictureListItem image={versatilityIcon} title="Versatility">
                <p>
                  Our business revolves around building products in three
                  different technologies: iOS, Android, and React Native.
                  Because we value both the strong foundation of native mobile
                  development and the versatility of cross-platform solutions,
                  most of us are comfortable with at least two of them.
                </p>
              </PictureListItem>
              <PictureListItem image={reliabilityIcon} title="Reliability">
                <p>
                  Working remotely we all need to be able to self-manage,
                  recognize what the priorities arem and focus our work on
                  what's most important. Being responsible and taking ownership
                  of our work is key for us.
                </p>
              </PictureListItem>
              <PictureListItem image={diversityIcon} title="Diversity">
                <p>
                  Monocultural teams create boring and one-sided products.
                  That's not us. Instead, we strive to create depth that comes
                  from combining different points of view. Currently we're seven
                  developers spread over four countries all over Europe and
                  we're not stopping there.
                </p>
              </PictureListItem>
            </ul>
          </div>

          <div className="contact-form">
            <div className="content center">
              <div className="text-left row no-outsourcing">
                <section>
                  <h3>NO OUTSOURCING POLICY</h3>
                  <p>
                    We pride ourselves on the quality of our work and it's our
                    top priority to ensure you get the best results. For this
                    reason we never outsource any parts of our projects to 3rd
                    parties.
                  </p>
                </section>
                <StaticImage
                  src="../assets/illustrations/team-no-outsourcing.png"
                  alt="No outsourcing policy"
                  height={320}
                />
              </div>
            </div>
          </div>
          <div className="narrow-column">
            <div className="center">
              <h3> Would you like to see us? </h3>
              <p className="sub2">
                We understand that sometimes there's a need for a more personal
                contact. If you want to see better what drives us, take a look
                at our video channels:
              </p>
            </div>
          </div>

          <div className="row movies">
            <div className="column-400 youtube-container">
              <div className="youtube-wrapper">
                <iframe
                  src="https://www.youtube.com/embed/udnxfH9me1Q"
                  className="youtube"
                />
              </div>
              <a className="sub1" href="https://brains.zone/no-brainers">
                No Brainers
              </a>
              <p>
                Curated look at new technologies, tools and ideas that will
                improve your daily work.
              </p>
            </div>
            <div className="column-400 youtube-container">
              <div className="youtube-wrapper">
                <iframe
                  className="youtube"
                  src="https://www.youtube.com/embed/grR9UmbjpsQ"
                />
              </div>
              <a className="sub1" href="https://brains.zone/brain-picks">
                Brain Picks
              </a>
              <p>
                A place where we offer easy solutions to common problems in
                everyday development.
              </p>
            </div>
          </div>
        </div>
        <ContactForm subtitle="If that's not enough and you crave for some face-to-face contact, feel free to use the contact form to get in touch with us!" />
      </Layout>
    )
  }
}

export const query = graphql`
  query teamPageQuery {
    versatilityIcon: file(relativePath: { regex: "/team-versatility-icon/" }) {
      ...illustrationIconImageProps
    }
    reliabilityIcon: file(relativePath: { regex: "/team-reliability-icon/" }) {
      ...illustrationIconImageProps
    }
    diversityIcon: file(relativePath: { regex: "/team-diversity-icon/" }) {
      ...illustrationIconImageProps
    }
    testimonialImage: file(
      relativePath: { regex: "/team-natalia/" }
      sourceInstanceName: { eq: "testimonialsAssets" }
    ) {
      ...testimonialImageFragment
    }
    teamImages: allFile(
      filter: {
        sourceInstanceName: { eq: "teamAssets" }
        relativePath: {
          in: [
            "patryk.jpg"
            "wojtek.jpg"
            "marek.jpg"
            "szymon.jpg"
            "lukasz.jpg"
            "blazej.jpg"
            "open-positions.jpg"
          ]
        }
      }
    ) {
      nodes {
        relativePath
        childImageSharp {
          gatsbyImageData(transformOptions: { fit: CONTAIN })
        }
      }
    }
  }
`

export default TeamPage

export const Head = ({ location }) => (
  <SEO title={title} description={description} pathname={location.pathname} />
)
