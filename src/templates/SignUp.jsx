import React, { useState, useCallback } from 'react'
import { TextInput, PrimaryButton } from '../components/UIkit/index'
import { signUp } from '../reducks/users/operations'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { MSpace, SContainer, SCenter, PLink } from '../styles/index'

const SignUp = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState(""),
        [email, setEmail] = useState(""),
        [password, setPassword] = useState(""),
        [confirmPassword, setConfirmPassword] = useState("");

  const inputUsername = useCallback((e) => {
    setUsername(e.target.value);
  }, [setUsername]);

  const inputEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, [setEmail]);

  const inputPassword = useCallback((e) => {
    setPassword(e.target.value);
  }, [setPassword]);

  const inputConfirmPassword = useCallback((e) => {
    setConfirmPassword(e.target.value);
  }, [setConfirmPassword]);

  return (
    <SContainer>
      <h2 className="u-text__headline u-text-center">アカウント登録</h2>
      <MSpace />
      <TextInput 
        fullWidth={true} label={"ユーザー名"} multiline={false} required={true}
        rows={1} value={username} type={"text"} onChange={inputUsername}
      />
      <TextInput 
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
        rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <TextInput 
        fullWidth={true} label={"パスワード"} multiline={false} required={true}
        rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      <TextInput 
        fullWidth={true} label={"パスワード（再確認）"} multiline={false} required={true}
        rows={1} value={confirmPassword} type={"password"} onChange={inputConfirmPassword}
      />
      <MSpace />
      <SCenter>
        <PrimaryButton
          label={"アカウントを登録する"}
          onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
        />
        <MSpace />
        <PLink onClick={() => dispatch(push('/signin'))}>アカウントをお持ちの方はこちら</PLink>
      </SCenter>
    </SContainer>
  )
}

export default SignUp;