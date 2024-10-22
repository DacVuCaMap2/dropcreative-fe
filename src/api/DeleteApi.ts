"use server"
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';

export default async function DeleteApi(url: string, config?: any) {
    const cookie = cookies();
    const jwt = cookie.get("auth_token")?.value;
    try {
        const defaultConfig = {
            headers: {
                Authorization: 'Bearer ' + jwt
            }
        };
        const finalConfig = { ...defaultConfig, ...config };
        const response = await axios.delete(url, finalConfig);
        // console.log(response.data.data);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log("error " + axiosError);
        return { error: axiosError.response?.data || '0' };
    }
}
