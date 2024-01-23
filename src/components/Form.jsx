import React from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export const Form = ({title,handleClickButtonForm,isRegistration}) => {
    const [email,setEmail] = React.useState('');
    const [pass,setPass] = React.useState('');
    const [name,setName] = React.useState('');

    const handleButtonClick = () => {
      if (isRegistration) {
        handleClickButtonForm(email, pass, name);
      } else {
        handleClickButtonForm(email, pass);
      }
    };
    const handleForgotPassword = async () => {
      try {
        const auth = getAuth();
        await sendPasswordResetEmail(auth, email);
        alert('Письмо для восстановления пароля отправлено на вашу почту.');
      } catch (error) {
        console.error('Ошибка при отправке письма для восстановления пароля:', error);
        alert('Ошибка при отправке письма для восстановления пароля.');
      }
    };
    return (
      <div className="form-container">
        {/* <form> */}
        {isRegistration && (
          <>
            <input required type="text" value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} />
          </>
        )}
        <input required type="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        <input required type="password" value={pass} placeholder='Password' onChange={(e) => setPass(e.target.value)} />
        {!isRegistration && <p className="forgot-pass" onClick={handleForgotPassword}>Забыли пароль?</p>}
        <button onClick={handleButtonClick}>{title}</button>
        {/* <button type="submit" onClick={handleButtonClick}>{title}</button> */}
        {/* </form> */}
      </div>
    );
}
