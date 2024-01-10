import React from 'react'
import {Form} from './Form';
import {useDispatch,useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {setUser} from '../redux/slices/userSlice';
import { getAuth, signInWithEmailAndPassword, signInWithPhoneNumber } from "firebase/auth";
export const Login = () => {
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const handleLogin=(email,password)=>{
        const auth = getAuth();
        signInWithEmailAndPassword(auth,email,password)
        .then(({user})=>{
            dispatch(setUser({
                email:user.email,
                id:user.uid,
                token:user.accessToken,
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
