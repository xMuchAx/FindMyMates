import InputText from "../components/InputText"
import logo from "../assets/logo.svg"
import { style } from "../style/LoginRegister.css"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
import { col1, col2 } from "../theme/colors"
import request from "../request"
import { useState } from "react"
import { baseServerUrl } from "../config"
import {AuthContext} from "../AuthContext"
import { useContext } from 'react';

function Login() {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event: any) {
    event.preventDefault()

    var data: any
    var userId: string
    var token: string

    try {
      data = await request(`${baseServerUrl}/user/login/`, 'POST', {
        email: email,
        password: password
      })

      userId = data.id
      token = data.token



      if (authContext !== null) {
        authContext.setAuth({ userId, token });
      } else {
        throw new Error("AuthContext is null");
      }
    }
    catch (error) {
      alert("Wrong email or password")
      return
    }

    navigate('/home')
    console.log(data)
  }

  return (
    <main style={style.main}>
      <div style={style.contentDiv}>
        <img style={ style.logo } src={logo} alt="Logo FindMyMates"/>
        <p style={style.desc}>Sign in with your data that you have entered during your registration</p>

        <form style={style.form} onSubmit={handleSubmit}>
          <div style={style.formField}>
            <label style={{ color: col2 }} htmlFor="">Email</label>
            <InputText value={email} onChange={e => setEmail(e.target.value)}/>
          </div>
          <div style={style.formField}>
            <label style={{ color: col2 }} htmlFor="">Password</label>
            <InputText password={true} value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
          <Button text="Sign In" style={{fontSize: '1rem', padding: '0.75rem 7rem', marginBottom: '0.2rem', marginTop: '0.5rem'}} type="submit" />
          <p style={{ color: col2 }}>Don't have an account ? <a href="/register" style={{color: col1}}>Sign Up</a></p>
        </form>
      </div>
    </main>
  );
}

export default Login;
