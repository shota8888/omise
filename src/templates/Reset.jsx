import React, { useState, useCallback } from 'react'
import { TextInput, PrimaryButton } from '../components/UIkit/index'
import { resetPassword } from '../reducks/users/operations'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { MSpace, SContainer, SCenter, PLink } from '../styles/index'

const Reset = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState("");

  const inputEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, [setEmail]);

  return (
    <SContainer>
      <h2 className="u-text__headline u-text-center">パスワードリセット</h2>
      <MSpace />
      <TextInput 
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
        rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <MSpace />
      <SCenter>
        <PrimaryButton
          label={"設定用メールを送信"}
          onClick={() => dispatch(resetPassword(email))}
        />
        <MSpace />
        <PLink onClick={() => dispatch(push('/signin'))}>ログイン画面に戻る</PLink>
      </SCenter>
    </SContainer>
  )
}

export default Reset;