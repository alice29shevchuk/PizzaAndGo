import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {setUser,deleteUser} from '../redux/slices/userSlice';
import {useNavigate} from 'react-router-dom';
import { getAuth,updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider,sendPasswordResetEmail } from "firebase/auth";

export const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const { name, email } = useSelector((state) => state.user);
    const [newName, setNewName] = useState(name);
    const [newEmail, setNewEmail] = useState(email);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');  // Define newPassword state

    React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      dispatch(setUser({
        email: parsedUser.email,
        name: parsedUser.displayName,
      }));  
    }
    }, [dispatch]);
    const handleUpdateProfile = async() => {
    const current = getAuth().currentUser;
    dispatch(
      setUser({
        email: newEmail || email,
        name: newName || name,
      })
    );
    const updatedUser = {
        email: newEmail || email,
        displayName: newName || name,
    };
    await updateProfile(current, {
        displayName: newName || name,
        email:newEmail || email,
    });
    if (newPassword) {
        try {
          const credential = EmailAuthProvider.credential(email, currentPassword);
          await reauthenticateWithCredential(current, credential);
          await updatePassword(current, newPassword);
        } catch (error) {
          console.error('Ошибка при обновлении пароля:', error);
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
        }
      }
    const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        parsedUser.email = updatedUser.email;
        parsedUser.displayName = updatedUser.displayName;
        localStorage.setItem('user', JSON.stringify(parsedUser));
      }  
    navigate('/user-profile');
    setIsEditing(false);
    };

    const handleForgotPassword = async () => {
        try {
          await sendPasswordResetEmail(getAuth(), email);
          alert('Письмо для восстановления пароля отправлено на вашу почту.');
        } catch (error) {
          console.error('Ошибка при отправке письма для восстановления пароля:', error);
          alert('Ошибка при отправке письма для восстановления пароля.');
        }
      };
    const handleLogOut = ()=>{
    dispatch(deleteUser());
    localStorage.removeItem('user');
    navigate('/login');
    }
    return (
        <div className="main">
        <div className="profile-info-container">
          <h1>Welcome, {name}!</h1>
          <p className="profile-info">
            <strong>Name:</strong> {name}
          </p>
          <p className="profile-info">
            <strong>Email:</strong> {email}
          </p>
          <p className="profile-info">
          <strong>Пароль:</strong> ******
        </p>
        </div>
  
        <div className="buttons-container">
          {isEditing ? (
            <div className="update-profile-container">
              <label className="profile-label">
                <strong>Name:</strong>
                <input
                  className="profile-input"
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </label>
              <label className="profile-label">
                <strong>Email:</strong>
                <input
                  className="profile-input"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </label>
              <label className="profile-label">
              <strong>Текущий пароль:</strong>
              <input
                className="profile-input"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </label>
            <button className="forgot-password-button" onClick={handleForgotPassword}>
            Забыли пароль?
            </button>
            <label className="profile-label">
              <strong>Новый пароль:</strong>
              <input
                className="profile-input"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
              <button className="profile-button" onClick={handleUpdateProfile}>
                Save Changes
              </button>
            </div>
          ) : (
            <div className="update-profile-container">
              <button className="profile-button" onClick={() => setIsEditing(true)}>
                Update Profile
              </button>
            </div>
          )}
          <button className="logout-button" onClick={handleLogOut}>
            Log out
          </button>
        </div>
      </div>  
    )
}
