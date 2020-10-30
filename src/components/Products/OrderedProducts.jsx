import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { List, ListItem, ListItemAvatar, ListItemText, Divider } from '@material-ui/core'
import styled from 'styled-components/macro'
import { PrimaryButton } from '../UIkit'
import NoImage from '../../assets/img/src/no_image.png'

const OrderedProducts = (props) => {
  const dispatch = useDispatch()
  const products = props.products

  const imagePath = useCallback((product) => {
    const images = (product.images.length > 0) ? product.images : [{path: NoImage}]
    return images[0].path
  }, [])

  const goToProductDetail = useCallback((id) => {
    dispatch(push(`/product/${id}`))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <List>
      {products.map(product => (
        <>
          <StListItem key={product.id}>
            <ListItemAvatar>
              <StImg src={imagePath(product)} alt='Ordered Product' />
            </ListItemAvatar>
            <div css='width: 100%;'>
              <ListItemText primary={product.name} secondary={`サイズ: ${product.size}`} />
              <ListItemText primary={`¥${product.price.toLocaleString()}`} />
            </div>
            <PrimaryButton label={'商品の詳細を見る'} onClick={() => goToProductDetail(product.id)} />
          </StListItem>
          <Divider />
        </>
      ))}
    </List>
  )
}

const StListItem = styled(ListItem)`
  background: #fff;
  height: auto;
`

const StImg = styled.img`
  object-fit: cover;
  margin: 8px 16px 8px 0;
  height: 96px;
  width: 96px;
`

export default OrderedProducts
