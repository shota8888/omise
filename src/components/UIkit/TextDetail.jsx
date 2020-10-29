import React from 'react'
import styled from 'styled-components/macro'
import { FRowWrap } from '../../styles'

const TextDetail = (props) => {
  return (
    <ExFRowWrap>
      <StLabel>{props.label}</StLabel>
      <StValue>{props.value}</StValue>
    </ExFRowWrap>
  )
}

const ExFRowWrap = styled(FRowWrap)`
  margin-bottom: 16px;
`

const StLabel = styled.div`
  margin-left: 0;
  margin-right: auto;
`

const StValue = styled.div`
  font-weight: 600;
  margin-left: auto;
  margin-right: 0;
`

export default TextDetail
