import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import styled from 'styled-components'
import { HMain, MSpace, SContainer, SCenter } from '../styles'
import { getUserName } from '../reducks/users/selectors'
import { PrimaryButton } from '../components/UIkit'

const UserMyPage = (props) => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const username = getUserName(selector)

  return (
    <SContainer>
      <HMain>マイページ</HMain>
      <MSpace />
      <StHeadSub>{username} 様</StHeadSub>
      <MSpace />
      <SCenter>
        <PrimaryButton label={'注文履歴'} onClick={() => dispatch(push('/order/history'))} />
      </SCenter>
    </SContainer>
  )
}

const StHeadSub = styled.h3`
  font-size: 1.25rem;
  text-align: center;
`

export default UserMyPage
