import {create} from 'zustand';
import api from '../services/api';


const useAuthStore=create((set)=>({
    user:null,
    token:localStorage.getItem('token') || null,
    loading:false,

    login:async(credentials)=>{
        set({loading:true});
        try{
            const response=await api.post('/auth/login',credentials);
            const {user,token}=response.data;
            localStorage.setItem('token',token);
             localStorage.setItem('user',user);
             localStorage.setItem('role',user.role);
            set({user,token,loading:false});

        }catch(error){
            set({error:error.message,loading:false});
        }
    },
    logout:()=>{
        localStorage.removeItem('token');
        set({user:null,token:null});
    }
}));

export default useAuthStore;