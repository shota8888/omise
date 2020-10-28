import React from 'react'
import { useSelector } from 'react-redux'
import { Divider, ListItem, ListItemText, ListItemAvatar, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import styled from 'styled-components/macro'
import { db } from '../../firebase'
import { getUserId } from '../../reducks/users/selectors'

const CartListItem = (props) => {
  const selector = useSelector(state => state)
  const uid = getUserId(selector)

  const image = props.product.images[0].path
  const name = props.product.name
  const price = props.product.price.toLocaleString()
  const size = props.product.size

  const removeProductFromCart = (id) => {
    return db.collection('users').doc(uid).collection('cart').doc(id).delete()
  }

  return (
    <>
      <ListItem css='height: 128px;'>
        <ListItemAvatar>
          <StImg src={image} alt='商品画像' />
        </ListItemAvatar>
        <div css='width: 100%;'>
          <ListItemText 
            primary={name} 
            secondary={`サイズ: ${size}`} 
          />
          <ListItemText primary={`¥${price}`} />
        </div>
        <IconButton onClick={() => removeProductFromCart(props.product.cartId)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  )
}

const StImg = styled.img`
  object-fit: cover;
  margin: 16px;
  width: 96px;
  height: 96px;
`

export default CartListItem