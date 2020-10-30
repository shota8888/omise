import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { List } from '@material-ui/core'
import styled from 'styled-components'
import { SWrapin, HMain, MSpace, ESSpace, FColumn } from '../styles'
import { getProductsInCart } from '../reducks/users/selectors'
import { CartListItem } from '../components/Products'
import { PrimaryButton } from '../components/UIkit'

const CartList = () => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const productsInCart = getProductsInCart(selector)

  const goToOrder = useCallback(() => {
    dispatch(push('/order/confirm'))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const backToHome = useCallback(() => {
    dispatch(push('/'))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SWrapin>
    <HMain>ショッピングカート</HMain>
    <StList>
      {productsInCart.length > 0 && (
        productsInCart.map(product => <CartListItem key={product.cartId} product={product} />)
      )}
    </StList>
    <MSpace />
    <FColumn>
      <PrimaryButton label={'レジへ進む'} onClick={goToOrder} />
      <ESSpace />
      <PrimaryButton grey='grey' label={'ショッピングを続ける'} onClick={backToHome} />
    </FColumn>
  </SWrapin>
  )
}

const StList = styled(List)`
  margin: 0 auto;
  max-width: 512px;
  width: 100%;
`

export default CartList