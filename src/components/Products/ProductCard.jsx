import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { 
  Card, CardContent, CardMedia, Typography, 
  IconButton, Menu, MenuItem
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import styled from 'styled-components'
import NoImage from '../../assets/img/src/no_image.png'
import { deleteProduct } from '../../reducks/products/operations'

const ProductCard = (props) => {
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const images = (props.images.length > 0) ? props.images : [{path: NoImage}]
  const price = props.price.toLocaleString()

  return (
    <StCard>
      <StCardMedia
        image={images[0].path}
        title=''
        onClick={() => dispatch(push('/product/' + props.id))}
      />
      <StCardContent>
        <div onClick={() => dispatch(push('/product/' + props.id))}>
          <Typography color='textSecondary' component='p'>
            {props.name}
          </Typography>
          <StTypography component='p'>
            ¥{price}
          </StTypography>
        </div>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem 
            onClick={() => {
              dispatch(push('/product/edit/' + props.id))
              handleClose()
            }}
          >
            編集する
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(deleteProduct(props.id))
              handleClose()
            }}
          >
            削除する
          </MenuItem>
        </Menu>
      </StCardContent>
    </StCard>
  )
}

const StCard = styled(Card)`
  ${props => props.theme.breakpoints.down('sm')} {
    margin: 8px;
    width: calc(50% - 16px);
  }
  ${props => props.theme.breakpoints.up('sm')} {
    margin: 16px;
    width: calc(33.333% - 32px); 
  }
`

const StCardMedia = styled(CardMedia)`
  height: 0;
  padding-top: 100%;
  cursor: pointer;
` 

const StCardContent = styled(CardContent)`
  display: flex;
  padding: 16px 8px;
  text-align: left;
  &:last-child {
    padding-bottom: 16px;
  }
`

const StTypography = styled(Typography)`
  color: ${props => props.theme.palette.secondary.dark};
  font-size: 16px;
`

export default ProductCard