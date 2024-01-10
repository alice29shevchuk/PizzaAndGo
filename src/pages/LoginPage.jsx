import React from 'react'
import { Login } from '../components/Login'
import { Link } from 'react-router-dom'

export const LoginPage = () => {
  return (
    <div className="form-container">
        <h1>Авторизация</h1>
        <Login></Login>
        <p className="registration-text">Хотите создать новый аккаунт?
          <span className="registration-link">
            <Link to='/registration'>Регистрация</Link>
          </span>
        </p>
    </div>
  )
}
