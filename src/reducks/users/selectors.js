import { createSelector } from 'reselect'

const usersSelector = (state) => state.users

export const getUserId = createSelector(
  [usersSelector],
  state => state.uid
)

export const getUserName = createSelector(
  [usersSelector],
  state => state.username
)

export const getUserRole = createSelector(
  [usersSelector],
  state => state.role
)

export const getSignedIn = createSelector(
  [usersSelector],
  state => state.isSignedIn
)

export const getProductsInCart = createSelector(
  [usersSelector],
  state => state.cart
)

export const getOrdersHistory = createSelector(
  [usersSelector],
  state => state.orders
)