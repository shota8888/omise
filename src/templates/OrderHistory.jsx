import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List } from '@material-ui/core'
import styled from 'styled-components'
import { SWrapin } from '../styles'
import { getOrdersHistory } from '../reducks/users/selectors'
import { fetchOrdersHistory } from '../reducks/users/operations'
import { OrderHistoryItem } from '../components/Products'

const OrderHistory = () => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const orders = getOrdersHistory(selector)

  useEffect(() => {
    dispatch(fetchOrdersHistory())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SWrapin>
      <StList>
        {orders.length > 0 && (
          orders.map(order => <OrderHistoryItem order={order} key={order.id}/>)
        )}
      </StList>
    </SWrapin>
  )
}

const StList = styled(List)`
  background-color: ${props => props.theme.palette.grey["100"]};
  margin: 0 auto;
  padding: 32px;
  ${props => props.theme.breakpoints.down('sm')} {
    width: 100%;
  }
  ${props => props.theme.breakpoints.up('md')} {
    width: 768px;
  } 

`

export default OrderHistory
