import React from 'react'
import {
  TableContainer, Table, TableBody, 
  TableCell, TableRow , IconButton, 
} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import styled from 'styled-components'

const SizeTable = (props) => {
  const sizes = props.sizes

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {sizes.length > 0 && (
            sizes.map(item => (
              <TableRow key={item.size}>
                <TableCell component='th' scope='row'>
                  {item.size}
                </TableCell>
                <TableCell>
                  残り{item.quantity}点
                </TableCell>
                <StTableCell>
                  {item.quantity > 0 ? (
                    <StIconButton onClick={() => props.addProduct(item.size)}>
                      <ShoppingCartIcon />
                    </StIconButton> 
                  ) : (
                    <div>売切</div>
                  )}
                </StTableCell>
                <StTableCell>
                  <StIconButton>
                    <FavoriteBorderIcon />
                  </StIconButton>
                </StTableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
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

export default SizeTable