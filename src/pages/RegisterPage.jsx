import React from 'react'
import { SignUp } from '../components/SignUp'
import { Link } from 'react-router-dom'

export const RegisterPage = () => {
  return (
    <div className="form-container">
        <h1>Регистрация</h1>
        <SignUp></SignUp>
        <p>Уже есть аккаунт?
        <span className="registration-link">
            <Link to='/login'>Войти</Link>
          </span>
        </p>
    </div>
  )
}
