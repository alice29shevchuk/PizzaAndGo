import {useSelector} from 'react-redux';
export function useAuth(){
    const { email,token,id,name} = useSelector((state)=>state.user);
    return{
        isAuth: !!name,
        email,
        token,
        id,
        name,
    };
//     const { email, token, id, name } = useSelector((state) => state.user);
//     const storedUser = JSON.parse(localStorage.getItem('user'));

//   return {
//     isAuth: !!name || (storedUser && storedUser.displayName),
//     email,
//     token,
//     id,
//     name,
//   };
}