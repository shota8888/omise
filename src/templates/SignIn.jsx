import React, { useState, useCallback } from 'react'
import { TextInput, PrimaryButton } from '../components/UIkit/index'
import { signIn } from '../reducks/users/operations'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { MSpace, SContainer, SCenter, PLink } from '../styles/index'

const SignIn = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState(""),
        [password, setPassword] = useState("");

  const inputEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, [setEmail]);

  const inputPassword = useCallback((e) => {
    setPassword(e.target.value);
  }, [setPassword]);

  return (
    <SContainer>
      <h2 className="u-text__headline u-text-center">サインイン</h2>
      <MSpace />
      <TextInput 
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
        rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <TextInput 
        fullWidth={true} label={"パスワード"} multiline={false} required={true}
        rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      <MSpace />
      <SCenter>
        <PrimaryButton
          label={"サインイン"}
          onClick={() => dispatch(signIn(email, password))}
        />
        <MSpace />
        <PLink onClick={() => dispatch(push('/signin/reset'))}>パスワードを忘れた方はこちら</PLink>
        <PLink onClick={() => dispatch(push('/signup'))}>アカウントをお持ちでない方はこちら</PLink>
      </SCenter>
    </SContainer>
  )
}

export default SignIn;