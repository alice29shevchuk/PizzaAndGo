import React from 'react'
import { SignUp } from '../components/SignUp'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

export const RegisterPage = () => {
  return (
    <>
    <div className="form-container">
        <h1>Регистрация</h1>
        <SignUp></SignUp>
        <p>Уже есть аккаунт?
        <span className="registration-link">
            <Link to='/login'>Войти</Link>
          </span>
        </p>
    </div>
    <Footer></Footer>
    </>
  )
}
