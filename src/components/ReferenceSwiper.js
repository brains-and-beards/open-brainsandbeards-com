import React, { Component } from 'react'
import Swiper from './Swiper'
import SwiperItem from './SwiperItem'

import references from '../assets/testimonials'

class ReferenceSwiper extends Component {
  render() {
    return (
      <div className="references">
        <Swiper ContentClass={SwiperItem} items={references} />
      </div>
    )
  }
}

export default ReferenceSwiper
