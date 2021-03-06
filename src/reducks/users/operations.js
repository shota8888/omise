import { push } from 'connected-react-router'
import { signInAction, signOutAction, fetchProductsInCartAction, fetchOrdersHistoryAction } from './actions'
import { initProductsAction } from '../products/actions'
import { showLoadingAction, hideLoadingAction } from '../loading/actions'
import { auth, FirebaseTimestamp, db } from '../../firebase/index'
import { isValidRequiredInput, isValidEmailFormat } from '../../functions/common'

const usersRef = db.collection('users')

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        usersRef.doc(user.uid).get()
          .then(snapshot => {
            const data = snapshot.data()
            if (!data) {
              throw new Error('ユーザーデータが存在しません。')
            }

            dispatch(signInAction({
              email: data.email,
              isSignedIn: true,
              role: data.role,
              uid: user.uid,
              username: data.username
            }))
          })
      } else {
        dispatch(push('/signin'))
      }
    })
  }
}

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    if (!isValidRequiredInput(username, email, password, confirmPassword)) {
      alert('必須項目が未入力です')
      return false
    }

    if (!isValidEmailFormat(email)) {
      alert('メールアドレスの形式が不正です。もう1度お試しください。')
      return false
    }

    if (password !== confirmPassword) {
      alert('パスワードが一致しません。もう1度お試しください。')
      return false
    }

    if (password.length < 6) {
      alert('パスワードは6文字以上で入力してください。')
      return false
    }

    return auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        dispatch(showLoadingAction('Sign Up...'))
        const user = result.user

        if (user) {
          const timestamp = FirebaseTimestamp.now()

          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: 'customer',
            uid: user.uid,
            updated_at: timestamp,
            username: username
          }

          usersRef.doc(user.uid).set(userInitialData)
            .then(async () => {
              dispatch(hideLoadingAction())
              dispatch(push('/'))
            })
        }
      }).catch((error) => {
        dispatch(hideLoadingAction())
        alert('アカウント登録に失敗しました。もう1度お試しください。')
        throw new Error(error)
      })
  }
}

export const signIn = (email, password) => {
  return async (dispatch) => {
    if (!isValidRequiredInput(email, password)) {
      alert('メールアドレスかパスワードが未入力です。')
      return false
    }

    if (!isValidEmailFormat(email)) {
      alert('メールアドレスの形式が不正です。もう1度お試しください。')
      return false
    }
    
    return auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        dispatch(showLoadingAction('Sign In...'))
        const user = result.user

        if (!user) {
          dispatch(hideLoadingAction());
          throw new Error('ユーザーIDを取得できません')
        }

        return usersRef.doc(user.uid).get()
          .then(snapshot => {
            const data = snapshot.data()
            if (!data) {
              dispatch(hideLoadingAction());
              throw new Error('ユーザーデータが存在しません')
            }

          dispatch(signInAction({
            email: data.email,
            isSignedIn: true,
            role: data.role,
            uid: user.uid,
            username: data.username
          }))
          dispatch(hideLoadingAction())
          dispatch(push('/'))
        })
      }).catch(() => {
        dispatch(hideLoadingAction())
      })
  }
}

export const signOut = () => {
  return async (dispatch, getState) => {
    dispatch(showLoadingAction('Sign Out...'))
    const uid = getState().users.uid

    await usersRef.doc(uid).collection('cart').get()
      .then(snapshots => {
        snapshots.forEach(snapshot => {
          usersRef.doc(uid).collection('cart').doc(snapshot.id).delete()
        })
      })

    auth.signOut()
      .then(() => {
        dispatch(signOutAction());
        dispatch(initProductsAction())
        dispatch(hideLoadingAction());
        dispatch(push('/signin'))
      }).catch(() => {
        dispatch(hideLoadingAction());
        throw new Error('ログアウトに失敗しました。')
      })
  }
}

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (!isValidEmailFormat(email)) {
      alert('メールアドレスの形式が不正です。もう1度お試しください。')
      return false
    } else {
      return auth.sendPasswordResetEmail(email)
        .then(() => {
            alert('入力されたアドレスにパスワードリセット用のメールをお送りしました。')
            dispatch(push('/signin'))
        }).catch(() => {
          alert('登録されていないメールアドレスです。もう一度ご確認ください。')
        })
    }
  }
}

export const addProductToCart = (addedProduct) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid
    const cartRef = usersRef.doc(uid).collection('cart').doc()
    addedProduct['cartId'] = cartRef.id
    await cartRef.set(addedProduct)
    dispatch(push('/cart'))
  }
}

export const fetchProductsInCart = (products) => {
  return async (dispatch) => {
    dispatch(fetchProductsInCartAction(products))
  }
}

export const fetchOrdersHistory = () => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid
    const list = []

    usersRef.doc(uid).collection('orders').orderBy('updated_at', 'desc').get()
      .then((snapshots) => {
        snapshots.forEach(snapshot => {
          const data = snapshot.data()
          list.push(data)
        })
        dispatch(fetchOrdersHistoryAction(list))
      })
  }
}