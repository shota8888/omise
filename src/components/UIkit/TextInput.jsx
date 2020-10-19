import React from 'react'
import TextField from '@material-ui/core/TextField'
import styled, { css } from 'styled-components'

const TextInput = (props) => {
  return (
    <StTextField 
      fullWidth={props.fullWidth}
      label={props.label}
      margin="dense"
      multiline={props.multiline}
      required={props.required}
      rows={props.rows}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
    />
  )
}

const full = css`
  margin-bottom: 16px;
`
const half = css`
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 16px;
  min-width: 130px;
  width: calc(50% - 16px);
`

const StTextField = styled(TextField)`
  ${props => props.fullWidth ? full : half};
`

export default TextInput