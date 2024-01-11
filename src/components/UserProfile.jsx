import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {setUser} from '../redux/slices/userSlice';
export const UserProfile = () => {
    const dispatch = useDispatch();

  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      console.log(parsedUser);
      dispatch(setUser({
        email: parsedUser.email,
        name: parsedUser.displayName,
      }));    }
  }, [dispatch]);
    const { name, email } = useSelector((state) => state.user);
    return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
    </div>
  )
}
