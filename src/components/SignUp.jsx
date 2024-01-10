import React from 'react'
import { Form } from './Form';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { setUser } from '../redux/slices/userSlice';
import { getAuth, createUserWithEmailAndPassword,updateProfile} from 'firebase/auth';
export const SignUp = () => {
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const handleRegister=(email, password, name, phoneNum)=>{
      if (!name || !email || !password || !phoneNum) {
        alert('Пожалуйста, заполните все поля!');
        return;
      }
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password, name, phoneNum)
        .then(({ user }) => {
          auth.currentUser.phoneNumber=phoneNum;
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
                  phone: user.phoneNumber,
                })
              );
              navigate('/');
            })
            .catch(console.error);
        })
        .catch(console.error);
    }
  return (
    <div>
      <Form title="Регистрация" handleClickButtonForm={handleRegister} isRegistration={true} />
    </div>
  )
}
