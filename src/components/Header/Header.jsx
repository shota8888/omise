import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import styled from 'styled-components/macro'
import { getSignedIn } from '../../reducks/users/selectors'
import { HeaderMenu, ClosableDrawer } from './index'

const Header = () => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const isSignedIn = getSignedIn(selector)

  const [open, setOpen] = useState(false)

  const handleDrawerToggle = useCallback((e) => {
    if (e.type === 'keydown' && e.key !== 'Enter') {
      return
    }
    setOpen(!open)
  }, [open, setOpen])

  return (
    <div css='flex-grow: 1'>
      <StAppBar position='fixed'>
        <StToolbar>
          <Typography 
            variant="h5" 
            css='cursor: pointer;'
            onClick={() => dispatch(push('/'))}
          >
            Omise
          </Typography>
          {isSignedIn && (
            <div css='margin: 0 0 0 auto;'>
              <HeaderMenu handleDrawerToggle={handleDrawerToggle} />
            </div>
          )}
        </StToolbar>
      </StAppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  )
}

const StAppBar = styled(AppBar)`
  background-color: #fff;
  color: #444;
`

const StToolbar = styled(Toolbar)`
  margin: 0 auto;
  max-width: 1024px;
  width: 100%;
`

export default Header