import React from 'react'
import { Login } from '../components/Login'
import { Link } from 'react-router-dom'

export const LoginPage = () => {
  return (
    <div>
        <h1>Авторизация</h1>
        <Login></Login>
        <p>Хотите создать новый аккаунт?<Link to='/registration'>Зарегистрироваться</Link></p>
    </div>
  )
}
