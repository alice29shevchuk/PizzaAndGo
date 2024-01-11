import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {setUser,deleteUser} from '../redux/slices/userSlice';
import {useNavigate} from 'react-router-dom';
export const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      console.log(parsedUser);
      dispatch(setUser({
        email: parsedUser.email,
        name: parsedUser.displayName,
      }));    
    }
  }, [dispatch]);
    const handleLogOut = ()=>{
    dispatch(deleteUser());
    localStorage.removeItem('user');
    navigate('/login');
    }
    const { name, email } = useSelector((state) => state.user);
    return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  )
}
