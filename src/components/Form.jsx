import React from 'react';
export const Form = ({title,handleClickButtonForm,isRegistration}) => {
    const [email,setEmail] = React.useState('');
    const [pass,setPass] = React.useState('');
    const [name,setName] = React.useState('');
    const [phone,setPhone] = React.useState('');

    const handleButtonClick = () => {
      if (isRegistration) {
        handleClickButtonForm(email, pass, name, phone);
      } else {
        handleClickButtonForm(email, pass);
      }
    };
    return (
      <div className="form-container">
        {/* <form> */}
        {isRegistration && (
          <>
            <input required type="text" value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} />
            <input required type="tel" value={phone} placeholder='Phone' onChange={(e) => setPhone(e.target.value)} />
          </>
        )}
        <input required type="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        <input required type="password" value={pass} placeholder='Password' onChange={(e) => setPass(e.target.value)} />
        <button onClick={handleButtonClick}>{title}</button>
        {/* <button type="submit" onClick={handleButtonClick}>{title}</button> */}
        {/* </form> */}
      </div>
    );
}
