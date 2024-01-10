import React from 'react'
import { SignUp } from '../components/SignUp'
import { Link } from 'react-router-dom'

export const RegisterPage = () => {
  return (
    <div>
        <h1>Регистрация</h1>
        <SignUp></SignUp>
        <p>Уже есть аккаунт?<Link to='/login'>Войти</Link></p>
    </div>
  )
}
