import React from 'react';

export const Form = ({title,handleClickButtonForm}) => {
    const [email,setEmail] = React.useState('');
    const [pass,setPass] = React.useState('');
  return (
    <div>
        <input type="email" value={email} placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" value={pass} placeholder='Password' onChange={(e)=>setPass(e.target.value)}/>
        <button onClick={()=>handleClickButtonForm(email,pass)}>{title}</button>
    </div>
  )
}
