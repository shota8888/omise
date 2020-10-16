import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import styled from 'styled-components'

const SelectBox = (props) => {
  return (
    <StFormControl>
      <InputLabel>{props.label}</InputLabel>
      <Select
        required={props.required} value={props.value}
        onChange={(e) => props.select(e.target.value)}
      >
        {props.options.map((option) => (
          <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
        ))}
      </Select>
    </StFormControl>
  )
}

const StFormControl = styled(FormControl)`
  margin-bottom: 16px;
  min-width: 128px;
  width: 100%;
`

export default SelectBox 