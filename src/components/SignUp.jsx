import React from 'react'
import { Form } from './Form';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { setUser } from '../redux/slices/userSlice';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
export const SignUp = () => {
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const handleRegister=(email,password)=>{
        const auth = getAuth();
        createUserWithEmailAndPassword(auth,email,password)
        .then(({user})=>{
            console.log(user);
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
    <>
      <Form title="Регистрация" handleClickButtonForm={handleRegister} />
    </>
  )
}
