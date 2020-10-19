import React from 'react'
import styled from 'styled-components'

const ImagePreview = (props) => {
  return (
    <StMediaThumb onClick={() => props.delete(props.id)}>
      <img alt='プレビュー画像' src={props.path} />
    </StMediaThumb>
  )
}

const StMediaThumb = styled.div`
  margin: .5rem;
  width: calc(50% - 1rem);
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

export default ImagePreview