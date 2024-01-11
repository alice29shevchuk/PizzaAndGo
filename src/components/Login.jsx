import React from 'react'
import {Form} from './Form';
import {useDispatch,useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {setUser} from '../redux/slices/userSlice';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export const Login = () => {
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const handleLogin=(email,password)=>{
      if (!email || !password) {
        alert('Пожалуйста, заполните все поля!');
        return;
      }
        const auth = getAuth();
        signInWithEmailAndPassword(auth,email,password)
        .then(({user})=>{
          console.log(user);
            dispatch(setUser({
                email:user.email,
                id:user.uid,
                token:user.accessToken,
                name:user.displayName,
            }));
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
        })
        .catch((error)=>
        {
          if (error.code === 'auth/invalid-credential') {
            alert('Такого пользователя не существует...', error.message);
          } 
          else if (error.code === 'auth/invalid-email') {
            alert('Не корректный email формат. Пример: example@gmail.com', error.message);
          } 
          else if (error.code === 'auth/weak-password') {
            alert('Слишком слабый пароль.', error.message);
          }
          else {
            alert('Ошибка при авторизации:(', error.message);
          }
        })
    }    
  return (
    <Form
    title="Войти"
    handleClickButtonForm={handleLogin}
    isRegistration={false}
    />
  )
}
