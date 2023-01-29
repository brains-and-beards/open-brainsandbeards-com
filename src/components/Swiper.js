import React, { Component } from 'react'
import ReactSwiper from 'react-id-swiper'

class Swiper extends Component {
  static defaultProps = {
    slidesPerView: 1,
    spaceBetween: 0,
  }

  constructor(props) {
    super(props)
    this.swiper = null
  }

  // TODO: Check if it was fixed
  // Fix arrow buttons in loop mode https://github.com/kidjp85/react-id-swiper/issues/85
  componentDidMount() {
    const slides = document.querySelectorAll('.swiper-slide')
    const fakeFirstSlide = slides[slides.length - 1]
    const fakeLastSlide = slides[0]

    if (!fakeFirstSlide.querySelector('.back')) return

    fakeLastSlide
      .querySelector('.reference.back')
      .addEventListener('click', this.goPrev)
    fakeLastSlide
      .querySelector('.reference.next')
      .addEventListener('click', this.goNext)
    fakeFirstSlide
      .querySelector('.reference.back')
      .addEventListener('click', this.goPrev)
    fakeFirstSlide
      .querySelector('.reference.next')
      .addEventListener('click', this.goNext)
  }

  goNext = (e) => {
    e.preventDefault()
    if (this.swiper) this.swiper.slideNext()
  }

  goPrev = (e) => {
    e.preventDefault()
    if (this.swiper) this.swiper.slidePrev()
  }

  renderItems = () => {
    const { items, ContentClass } = this.props

    return items.map((i) => (
      <div key={`reference-${i.company}`}>
        <ContentClass {...i} onNext={this.goNext} onPrev={this.goPrev} />
      </div>
    ))
  }

  render() {
    const { slidesPerView, spaceBetween } = this.props

    return (
      <ReactSwiper
        ref={(node) => {
          if (node) this.swiper = node.swiper
        }}
        pagination={{
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        }}
        grabCursor
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        centeredSlides
        loop
      >
        {this.renderItems()}
      </ReactSwiper>
    )
  }
}

export default Swiper
