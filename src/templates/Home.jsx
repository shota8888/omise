import React from 'react'
import { getUserId, getUserName } from '../reducks/users/selectors'
import { signOut } from '../reducks/users/operations'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

const Home = () => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const uid = getUserId(selector)
  const username = getUserName(selector)

  return (
    <div>
      <h2>Home</h2>
      <p>ユーザーID：{uid}</p>
      <p>ユーザー名：{username}</p>
      <button onClick={() => dispatch(signOut())}>サインアウト</button>
      <button onClick={() => dispatch(push('/product/edit'))}>商品情報の登録・編集</button>
    </div>
    
  )
}

export default Home