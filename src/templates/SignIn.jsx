import React, { useState, useCallback } from 'react'
import { TextInput, PraimaryButton } from '../components/UIkit/index'
import { signIn } from '../reducks/users/operations'
import { useDispatch } from 'react-redux'
import { MSpace } from '../assets/utilStyles'

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
    <div className="c-section-container">
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
      <div className="center">
        <PraimaryButton
          label={"サインイン"}
          onClick={() => dispatch(signIn(email, password))}
        />
      </div>
    </div>
  )
}

export default SignIn;