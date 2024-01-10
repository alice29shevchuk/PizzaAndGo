import {useSelector} from 'react-redux';
export function useAuth(){
    const { email,token,id,name,phone} = useSelector((state)=>state.user);
    return{
        isAuth: !!phone,
        email,
        token,
        id,
        name,
        phone,
    };
}