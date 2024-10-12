import {  TypeLogin, TypeRegister, TypeResponse } from '@/types/common';
import axios from './axiosConfig';
import { AxiosResponse } from 'axios';

const authLogin = (data:TypeLogin):Promise<AxiosResponse<TypeResponse>> => {
    return axios.post<TypeResponse>('/api/auth/login',data,{ withCredentials: true }); 
  };
const authRegister = (data:TypeRegister):Promise<AxiosResponse<TypeResponse>> => {
    return axios.post('/api/auth/register',data); 
};

const checkActiveCode = (code?:string, email?:string):Promise<AxiosResponse<TypeResponse>> => {
    return axios.get(`/api/auth/active?code=${code}&email=${email}`); 
};

export {
    authLogin,
    authRegister,
    checkActiveCode
};
