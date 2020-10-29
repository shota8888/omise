import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List, Divider } from '@material-ui/core'
import styled from 'styled-components'
import { HMain, SWrapin, FRowWrap, ESSpace } from '../styles'
import { getProductsInCart } from '../reducks/users/selectors'
import { orderProduct } from '../reducks/products/operations'
import { PrimaryButton, TextDetail } from '../components/UIkit'
import { CartListItem } from '../components/Products'

const OrderConfirm = () => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const productsInCart = getProductsInCart(selector)

  const subtotal = useMemo(() => {
    return productsInCart.reduce((sum, product) => sum += product.price, 0)
  }, [productsInCart])

  const shippingFee = useMemo(() => (subtotal >= 10000 || subtotal === 0) ? 0: 210, [subtotal])

  const tax = useMemo(() => subtotal * 0.1, [subtotal])

  const total = useMemo(() => subtotal + shippingFee + tax, [subtotal, shippingFee, tax])

  const order = useCallback(() => {
    dispatch(orderProduct(productsInCart, total))
  }, [dispatch, productsInCart, total])

  return (
    <SWrapin>
      <HMain>注文の確認</HMain>
      <FRowWrap>
        <StDetailBox>
          <List>
            {productsInCart.length > 0 && (
              productsInCart.map(product => <CartListItem key={product.cartId} product={product} />)
            )}
          </List>
        </StDetailBox>
        <StOrderBox>
          <TextDetail label={'商品合計'} value={`¥${subtotal.toLocaleString()}`} />
          <TextDetail label={'消費税'} value={`¥${tax.toLocaleString()}`} />
          <TextDetail label={'送料'} value={`¥${shippingFee.toLocaleString()}`} />
          <Divider />
          <ESSpace />
          <TextDetail label={'合計（税込）'} value={`¥${total.toLocaleString()}`} />
          <PrimaryButton label={'注文する'} onClick={order} />
        </StOrderBox>
      </FRowWrap>
    </SWrapin>
  )
}

const StDetailBox = styled.div`
  margin: 0 auto;
  ${props => props.theme.breakpoints.down('sm')} {
    width: 320px;
  }
  ${props => props.theme.breakpoints.up('md')} {
    width: 512px;
  } 
`

const StOrderBox = styled.div`
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 4;
  box-shadow: 0 4px 2px 2px rgba(0,0,0,0.2);
  width: 288px;
  height: 256px;
  margin: 24px auto 16px auto;
  padding: 16px;
`

export default OrderConfirm
