import React, { Component } from 'react'
import TrustBarItem from './TrustBarItem'
import moment from 'moment'

const BB_START_DATE = '08/25/2015'
const COMPANY_YEARS = moment(BB_START_DATE, 'MM/DD/YYYY')
  .fromNow()
  .split(' ')[0]

class TrustBar extends Component {
  static defaultProps = {
    items: [
      { value: COMPANY_YEARS, label: 'years on the market' },
      { value: '52 months', label: 'longest ongoing client engagement' },
      {
        value: '9+',
        label: 'average years of programming experience on our team',
      },
    ],
  }

  renderItem = (item) => (
    <TrustBarItem key={item.value} number={item.value} caption={item.label} />
  )

  render = () => {
    const { items } = this.props

    return (
      <section className="trustBar">
        <ul className="trustBarList row">{items.map(this.renderItem)}</ul>
      </section>
    )
  }
}

export default TrustBar
