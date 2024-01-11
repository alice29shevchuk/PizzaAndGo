import React from 'react'
import { Form } from './Form';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { setUser } from '../redux/slices/userSlice';
import { getAuth, createUserWithEmailAndPassword,updateProfile} from 'firebase/auth';
export const SignUp = () => {
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const handleRegister=(email, password, name)=>{
      if (!name || !email || !password ) {
        alert('Пожалуйста, заполните все поля!');
        return;
      }
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password, name)
        .then(({ user }) => {
          // auth.currentUser.phoneNumber=phoneNum;
          updateProfile(auth.currentUser, {
            displayName: name,
          })
            .then(() => {
              console.log(user);
              dispatch(
                setUser({
                  email: user.email,
                  id: user.uid,
                  token: user.accessToken,
                  name: user.displayName,
                })
              );
              localStorage.setItem('user', JSON.stringify(user));
              navigate('/');
            })
            .catch((error)=>{
              alert(error.code);
            })
        }).catch((error)=>{
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
    <div>
      <Form title="Регистрация" handleClickButtonForm={handleRegister} isRegistration={true} />
    </div>
  )
}
