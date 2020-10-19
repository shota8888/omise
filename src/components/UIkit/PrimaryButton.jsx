import React from 'react'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'

const PrimaryButton = (props) => {
  return (
    <StButton variant="contained" onClick={() => props.onClick()}>
      {props.label}
    </StButton>
  )
}

const StButton = styled(Button)`
  background-color: #2490D0;
  color: #fff;
  font-size: 16px;
  height: 48px;
  margin-bottom: 16px;
  width: 256px;
  &:hover {
    background-color: rgba(36,144,208,.9); 
  }
`

export default PrimaryButton