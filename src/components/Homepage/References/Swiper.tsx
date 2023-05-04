import React, { useRef } from 'react'
import Swiper from 'react-id-swiper'

const SimpleSwiperWithParams = ({ items, ContentClass }) => {
  const ref = useRef(null)

  const goNext = e => {
    e.preventDefault()
    if (ref.current !== null && ref.current.swiper !== null) {
      ref.current.swiper.slideNext()
    }
  }

  const goPrev = e => {
    e.preventDefault()
    if (ref.current !== null && ref.current.swiper !== null) {
      ref.current.swiper.slidePrev()
    }
  }

  return (
    <Swiper
      ref={ref}
      spaceBetween={0}
      grabCursor
      centeredSlides
      loop
      renderPrevButton={() => null}
      renderNextButton={() => null}
      pagination={{
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }}
    >
      {items.map(i => (
        <div key={`reference-${i.name}`}>
          <ContentClass {...i} onNext={goNext} onPrev={goPrev} />
        </div>
      ))}
    </Swiper>
  )
}

export default SimpleSwiperWithParams
