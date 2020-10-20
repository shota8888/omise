import React, {useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { HMain, SSpace, SWrapin, FRowWrap } from '../styles'
import { db } from '../firebase/index'
import { returnCodeToBr } from '../functions/common'
import { ImageSwiper, SizeTable } from '../components/Products'

const ProductDetail = () => {
  const selector = useSelector(state => state)
  const path = selector.router.location.pathname
  const id = path.split('/product/')[1]
  
  const [product, setProduct] = useState(null)

  useEffect(() => {
    db.collection('products').doc(id).get()
      .then(doc => {
        const data = doc.data()
        setProduct(data)
      })
  }, [])

  return (
    <SWrapin>
      {product && (
        <FRowWrap>
          <StSliderBox>
            <ImageSwiper images={product.images} />
          </StSliderBox>
          <StDetail>
            <HMain>{product.name}</HMain>
            <p css='font-size: 36px;'>¥{product.price.toLocaleString()}</p>
            <SSpace />
            <SizeTable sizes={product.sizes} />
            <SSpace />
            <p>{returnCodeToBr(product.description)}</p>
          </StDetail>
        </FRowWrap>
      )}
    </SWrapin>
  )
}

const StSliderBox = styled.div`
  ${props => props.theme.breakpoints.down('sm')} {
    margin: 0 auto 24px auto;
    width: 320px;
    height: 320px;
  }
  ${props => props.theme.breakpoints.up('sm')} {
    margin: 0 auto;
    width: 400px; 
    height: 400px;
  }
`

const StDetail = styled.div`
  text-align: left;
  ${props => props.theme.breakpoints.down('sm')} {
    margin: 0 auto 16px auto;
    width: 320px;
    height: 320px;
  }
  ${props => props.theme.breakpoints.up('sm')} {
    margin: 0 auto;
    width: 400px; 
    height: auto;
  }
`

export default ProductDetail