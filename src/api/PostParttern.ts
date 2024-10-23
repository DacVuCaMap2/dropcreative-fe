"use server"
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';

export default async function PostApi(url: string, data: any, config?: any) {
    const cookie = cookies();
    const jwt = cookie.get("auth_token")?.value;
    const defaultConfig = {
        headers: {
            Authorization: 'Bearer '+jwt
        }
    };
    const finalConfig = { ...defaultConfig, ...config }
    try {
        
        const response = await axios.post(url, data, finalConfig); 
        // console.log(response.data.data);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log("error "+ axiosError);
        return { error: axiosError.response?.data || 'An error occurred' }; // Trả về đối tượng lỗi
    }
}
