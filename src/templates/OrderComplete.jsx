import React from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { MSpace, SContainer, SCenter } from '../styles'
import { PrimaryButton } from '../components/UIkit'

const OrderComplete = () => {
  const dispatch = useDispatch()

  return (
    <SContainer>
      <SCenter>
        <p>ご注文ありがとうございました！</p>
        <MSpace />
        <PrimaryButton label='ショッピングを続ける' onClick={() => dispatch(push('/'))} />
      </SCenter>  
    </SContainer>
  )
}

export default OrderComplete
