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
                phone:user.phoneNumber,
            }));
            navigate('/');
        })
        .catch(console.error)
    }    
  return (
    <Form
    title="Войти"
    handleClickButtonForm={handleLogin}
    />
  )
}
