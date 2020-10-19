import React, { useState, useEffect, useCallback } from 'react'
import {
  TableContainer, Paper, Table, TableBody, 
  TableCell, TableHead, TableRow , IconButton, 
} from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import styled from 'styled-components/macro'
import { SSpace } from '../../styles'
import { TextInput } from '../UIkit'

const SetSizeArea = (props) => {
  const [index, setIndex] = useState(0),
        [size, setSize] = useState(''),
        [quantity, setQuantity] = useState(0);

  const inputSize = useCallback((e) => {
    setSize(e.target.value)
  }, [setSize],)
  
  const inputQuantity = useCallback((e) => {
    setQuantity(e.target.value)
  }, [setQuantity],)

  const addSize = (index, size, quantity) => {
    if (size === "" || quantity === 0) {
      return false
    } else {
      if (index === props.sizes.length) { // 追加
        props.setSizes(prevState => [...prevState, {size: size, quantity: quantity}])
        setIndex(index + 1)
        setSize('')
        setQuantity(0)
      } else { // 編集
        const newSizes = props.sizes
        newSizes[index] = {size: size, quantity: quantity}
        props.setSizes(newSizes)
        setIndex(newSizes.length)
        setSize('')
        setQuantity(0) 
      }
      
    }
  }

  const editSize = (index, size, quantity) => {
    setIndex(index)
    setSize(size)
    setQuantity(quantity)
  }

  const deleteSize = (deleteIndex) => {
    const newSizes = props.sizes.filter((item, i) => i !== deleteIndex)
    props.setSizes(newSizes)
  }

  useEffect(() => {
    setIndex(props.sizes.length)
  }, [props.sizes.length])

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>サイズ</TableCell>
              <TableCell>数量</TableCell>
              <StTableCell />
              <StTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sizes.length > 0 && (
              props.sizes.map((item, i) => (
                <TableRow key={item.size}>
                  <TableCell component="th" scope="row">{item.size}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <StTableCell>
                    <StIconButton onClick={() => editSize(i, item.size, item.quantity)}>
                      <EditIcon />
                    </StIconButton>
                  </StTableCell>
                  <StTableCell>
                    <StIconButton onClick={() => deleteSize(i)}>
                      <DeleteIcon />
                    </StIconButton>
                  </StTableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div>
          <TextInput
            fullWidth={false} label={'サイズ'} multiline={false} required={true}
            onChange={inputSize} rows={1} value={size} type={'text'}
          />
          <TextInput
            fullWidth={false} label={'数量'} multiline={false} required={true}
            onChange={inputQuantity} rows={1} value={quantity} type={'number'}
          />
        </div>
        <IconButton css='float: right;' onClick={() => addSize(index, size, quantity)}>
          <CheckCircleIcon />
        </IconButton>
      </TableContainer>
      <SSpace />
    </div>
  )
}

const StTableCell = styled(TableCell)`
  width: 48px;
  height: 48px;
  padding: 0;
`

const StIconButton = styled(IconButton)`
  width: 48px;
  height: 48px;
  padding: 0;
`

export default SetSizeArea