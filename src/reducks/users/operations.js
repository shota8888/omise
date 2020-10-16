import { signInAction, signOutAction } from './actions'
import { push } from 'connected-react-router'
import { auth, FirebaseTimestamp, db } from '../../firebase/index'
import { isValidRequiredInput, isValidEmailFormat } from '../../function/common';

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid

          db.collection('users').doc(uid).get()
            .then(snapshot => {
              const data = snapshot.data()

              dispatch(signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
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
        const user = result.user

        if (user) {
          const uid = user.uid
          const timestamp = FirebaseTimestamp.now()

          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: 'customer',
            uid: uid,
            updated_at: timestamp,
            username: username
          }

          db.collection('users').doc(uid).set(userInitialData)
            .then(() => {
              dispatch(push('/'))
            })
        }
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
      alert('メールアドレスの形式が不正です。')
      return false
    }
    
    auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user

        if (user) {
          const uid = user.uid

          db.collection('users').doc(uid).get()
            .then(snapshot => {
              const data = snapshot.data()

              dispatch(signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username
              }))

              dispatch(push('/'))
            })
        }
      })
  }
}

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut()
      .then(() => {
        dispatch(signOutAction());
        dispatch(push('/signin'))
      })
  }
}

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (!isValidRequiredInput(email)) {
      alert('必須項目が未入力です')
      return false
    } else {
      auth.sendPasswordResetEmail(email)
        .then(() => {
          alert('入力されたアドレスにパスワードリセット用のメールをお送りしました。')
          dispatch(push('/signin'))
        }).catch(() => {
          alert('パスワードリセットに失敗しました。')
        })
    }
  }
}