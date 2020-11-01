import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { 
  Divider, Drawer, List, ListItem, ListItemText,
  ListItemIcon, IconButton
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import HistoryIcon from '@material-ui/icons/History'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'
import { db } from '../../firebase'
import { signOut } from '../../reducks/users/operations'
import { getUserRole } from '../../reducks/users/selectors'
import { TextInput } from '../UIkit'

const useStyles = makeStyles({
  drawerPaper: {
    width: 256,
  }
})

const ClosableDrawer = (props) => {
  const classes = useStyles
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const userRole = getUserRole(selector)

  const isAdministrator = (userRole === 'administrator')
  const {container} = props
  
  const [searchKeyword, setSearchKeyword] = useState('')

  const inputSearchKeyword = useCallback((e) => {
    setSearchKeyword(e.target.value)
  }, [setSearchKeyword])

  const selectMenu = (e, path) => {
    dispatch(push(path))
    props.onClose(e)
  }

  const [filters, setFilters] = useState([
    {func: selectMenu, label: 'すべて', id: 'all', value: '/'},
    {func: selectMenu, label: 'メンズ', id: 'male', value: '/?gender=male'},
    {func: selectMenu, label: 'レディース', id: 'female', value: '/?gender=female'},
  ])

  const menus = [
    {func: selectMenu, label: '商品登録', icon: <AddCircleIcon />, id: 'register', value: '/product/edit'},
    {func: selectMenu, label: '注文履歴', icon: <HistoryIcon />, id: 'history', value: '/order/history'},
    {func: selectMenu, label: 'プロフィール', icon: <PersonIcon />, id: 'profile', value: '/user/mypage'}
  ]

  useEffect(() => {
    db.collection('categories').orderBy('order', 'asc').get()
      .then(snapshots => {
        const list = []
        snapshots.forEach(snapshot => {
          const category = snapshot.data()
          list.push({func: selectMenu, label: category.name, id: category.id, value: `/?category=${category.id}`},)
        })
        setFilters(prevState => [...prevState, ...list])
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StNav>
      <Drawer
        container={container}
        variant='temporary'
        anchor='right'
        open={props.open}
        onClose={(e) => props.onClose(e)}
        classes={{paper: classes.drawerPaper}}
        ModalProps={{keepMounted: true}}
      >
        <div
          onClose={(e) => props.onClose(e)}
          onKeyDown={(e) => props.onClose(e)}
        >
          <StSearch>
            <TextInput
              fullWidth={false} label={'キーワードを入力'} multiline={false} required={false}
              onChange={inputSearchKeyword} rows={1} value={searchKeyword} type={'text'} 
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </StSearch>
          <Divider />
          <List>
            {menus.map(menu => (
              ((isAdministrator && menu.id === 'register') || menu.id !== 'register') && (
                <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                  <ListItemIcon>
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText primary={menu.label} />
                </ListItem>
              )
            ))}
            <ListItem button key='logout' onClick={(e) => { dispatch(signOut()); props.onClose(e); }}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={'ログアウト'} />
            </ListItem>
          </List>
          <Divider />
          <List>
            {filters.map(filter => (
              <ListItem button key={filter.id} onClick={(e) => { filter.func(e, filter.value); props.onClose(e); }}>
                <ListItemText primary={filter.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </StNav>
  )
}

const StNav = styled.nav`
  ${props => props.theme.breakpoints.up('sm')} {
    flex-shrink: 0;
    width: 256px;
  }
`

const StSearch = styled.div`
  display: flex;
  align-items: center;
  margin-left: 32px;
`

export default ClosableDrawer