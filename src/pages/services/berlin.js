import React, { Component } from 'react'
import { Link } from 'gatsby'

class Berlin extends Component {
  render() {
    return (
      <div>
        <h1> Landing page: Berlin </h1>
        <p>
          The majority of our business comes from DACH countries, most of it
          from Germany. We've worked with clients from Hamburg, Cologne, Munich
          and, of course, Berlin.
        </p>
        <p>
          The reason is probably that we have solid grounds in German business
          culture. Both of the company founders lived in Germany for a longer
          period of time and worked in German companies. They actually even met
          working together for XING!
        </p>
        <h2> So, what kind of companies work with us? </h2>
        <p>
          Well, we're open to all interesting projects, but looking back at the
          work that we did we can see two patterns emerge:
        </p>
        <h3> Embedded mobile dev department </h3>
        <p>
          First one would be small and medium-sized companies that have a solid
          business base - a self-founded company that grew over a few years, or
          a startup that found its product-market fit and is focused on
          improving the mobile side of their product. For both of there profiles
          we offer a similar service: we take the responsbility of their mobile
          development department and work on their product under the guidance of
          their product owner and (usually) in-house designer.
        </p>
        <p>
          For example, you might be interested in reading the [Clincase case
          study] to see how such cooperation might look in practise.
        </p>
        <h3> Enterprise R&D </h3>
        <p>
          Second type of projects that we do often is introducing new products
          within a big organisation. Usually starting a new (especially when
          it's experimental) project in an enterprise is a time-consuming
          endavour - hiring itself can take ages and new projects are full of
          unknowns.
        </p>
        <p>
          In that case it's usually much faster to hire somebody from outside to
          deliver the first version of the product, while the permanent team is
          getting formed. Or maybe build a prototype for further testing before
          commitment to forming a permanent team. Sometimes it's also about
          creating tools to improve the internal workflow within the
          organisation.
        </p>
        <p>Examples of such type of work that we delivered would be:</p>
        <ul>
          <li>
            For a big commercial enterprise we helped creating a mobile
            application that uses various business data that they've been
            collecting for a few years to provide an machine-learning-powered
            product for small businesses. This was an experimental project as
            nobody was sure how useful the data set would be and how valuable it
            will be to end users.
          </li>
          <li>
            For a big transportation enterprise we worked on improving the app
            that their drivers use on the daily basis to manage their shipments,
            send proofs of delivery, estimate arrival times, etc. This is a
            typical example of an app done for a very particular type of user
            with clearly defined expectations.
          </li>
        </ul>
        <h2> How we work </h2>
        <p>
          If you're more interested how directly we work with our clients, you
          can
          <Link to="/projects/clincase/">
            read a case study of a project we've recently did for a Berlin
            company
          </Link>
          do
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

export default Berlin
