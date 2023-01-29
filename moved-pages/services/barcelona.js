import React, { Component } from 'react'
import { Link } from 'gatsby'

class Barcelona extends Component {
  render() {
    return (
      <div>
        <h1> Landing page: Barcelona </h1>
        <p>
          Although we're a remote company, we feel like Barcelona is our base of
          operations. That's where the company is registered, that's where we
          all started in the beginning, before we spread around Europe and
          that's where we regularly come back.
        </p>
        <p>
          Also, we're the organisers behind the
          <a href="https://www.meetup.com/React-Native-Barcelona/">
            React Native Barcelona meetup group
          </a>
          .When we started it in May 2016, virtually nobody around here was
          using React Native. Nowadays, the group has almost 400 members 💪
        </p>
        <h2> So, what kind of companies work with us? </h2>
        <p>
          We treat all clients equally and are always happy to discuss an
          interesting project, but when we look at our client base from
          Barcelona, they fall into two groups:
        </p>
        <h3> Startups </h3>
        <p>
          When getting a new company off the ground it's difficult to get the
          perfect team straight away. Nowadays you'd need separate developers
          for backend, frontend and two for each of the major mobile platforms.
          Apart form the costs and commitment, getting the mobile team started
          in your startup is difficult and time-consuming, I've previously
          <a href="https://brainsandbeards.com/blog/on-recruiting-a-small-mobile-team-ca470da11e96">
            written in details about the challenges with hiring a small mobile
            development team
          </a>
          .
        </p>
        <p>
          So, it's not a surprise we get asked to help out at early stage
          starups. Once they secured their funding, settled down on what they
          want to build, they need a reliable partner to take care of the whole
          mobile development. That's when we come in as their kick-off mobile
          dev department.
        </p>
        <h3> Enterprise </h3>
        <p>
          We helped enterprise clients start new, experimental projects. It's
          often much faster for a big organisation to ask us for help building
          the first version of the application / prototype / some internal tool,
          than hire a new team for it. If you want to see details of one of such
          projects, take a look at
          <Link to="/projects/rakuten/">one of our case studies</Link>.
        </p>
        <p>
          Another type is staff augmentation. Sometimes big companies just need
          some extra help within their existing teams to meet their goals and
          deadlines. We've helped on such occasions as well, with great results.
          Here's a testimonial for one of such projects:
        </p>
        <blockquote>
          Brains & Beards helped me by solving many technical impediments across
          various agile development teams through implementing the needed
          changes to the backend of those connected applications. The result was
          that we were able to release the product in time and scope. I would
          recommend Brains & Beards to people who need the profound support of
          experienced developers to solve technically challenging projects.
        </blockquote>
        <p>
          Sebastian Gerdemann, Senior Product Manager, XING E-Recruiting GmbH &
          Co. KG
        </p>
        <h2> Case study </h2>
        <p>
          As I mentioned above, you might want to read a case study of one of
          the projects that we delivered in Barcelona:
          <Link to="/projects/rakuten/">
            a new ecommerce application for the Spanish branch of a huge
            Japanese enterprise
          </Link>
          .
        </p>
        <div>
          <h2> Want to start a great project with us? </h2>
          <h3>
            <Link to="/estimate-project/">Get a project estimate</Link>
          </h3>
        </div>
      </div>
    )
  }
}

export default Barcelona
