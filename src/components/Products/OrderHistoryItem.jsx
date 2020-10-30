import React from 'react'
import { Divider } from '@material-ui/core'
import { ESSpace, SSpace } from '../../styles'
import { dateToString, datetimeToString } from '../../functions/common'
import { TextDetail } from '../UIkit'
import { OrderedProducts } from './index'

const OrderHistoryItem = (props) => {
  const orderedDatetime = datetimeToString(props.order.updated_at.toDate())
  const shippingDate = dateToString(props.order.shipping_date.toDate())
  const totalPrice = `¥${props.order.amount.toLocaleString()}`
  const products = props.order.products

  return (
    <div>
      <SSpace />
      <TextDetail label={'注文ID'} value={props.order.id} />
      <TextDetail label={'注文日時'} value={orderedDatetime} />
      <TextDetail label={'発送予定日'} value={shippingDate} />
      <TextDetail label={'注文金額'} value={totalPrice} />
      {props.order.products.length > 0 && (
        <OrderedProducts products={products} />
      )}
      <ESSpace />
      <Divider />
    </div>
  )
}

export default OrderHistoryItem
