import React from 'react'
import Button from '@material-ui/core/Button'
import styled, { css } from 'styled-components'

const PrimaryButton = (props) => {
  return (
    <StButton variant="contained" onClick={() => props.onClick()} grey={props.grey}>
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
    background-color: #2E9EDF
  }
  ${({grey}) => grey ? css`
        background-color: ${props => props.theme.palette.grey["300"]};
        color: #000;
        &:hover {
          background-color: ${props => props.theme.palette.grey["400"]}; 
        }
    ` : ''}
`

export default PrimaryButton