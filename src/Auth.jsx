import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listenAuthState } from './reducks/users/operations'
import { getSignedIn } from './reducks/users/selectors'

const Auth = ({ children }) => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const isSignedIn = getSignedIn(selector)

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState())
    }
  }, [dispatch, isSignedIn])

  if (!isSignedIn) {
    return <></>
  } else {
    return children
  }
}

export default Auth