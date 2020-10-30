import React, { useState } from 'react'
import Swiper from 'react-id-swiper'
import 'swiper/css/swiper.css'
import styled from 'styled-components'
import NoImage from '../../assets/img/src/no_image.png'


const ImageSwiper = (props) => {
  const [params] = useState({
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    loop: true
  })

  const images = props.images

  return (
    <Swiper {...params}>
      {images.length === 0 ? (
        <StMediaThumb>
          <img src={NoImage} alt='' />
        </StMediaThumb>
      ) : (
        images.map(image => (
          <StMediaThumb key={image.id}>
            <img src={image.path} alt='商品画像' />
          </StMediaThumb>
        ))
      )}
    </Swiper>
  )
}

const StMediaThumb = styled.div`
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    display: block;
    padding-top: 100%;
  }
  & img {
    position: absolute;
    object-fit: cover;
    object-position: center;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
  }
`

export default ImageSwiper