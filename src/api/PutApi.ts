"use server"
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';

export default async function PutApi(url: string, data: any, config?: any) {
    const cookie = cookies();
    const jwt = cookie.get("auth_token")?.value;

    try {
        const defaultConfig = {
            headers: {
                Authorization: 'Bearer ' + jwt,...config
            }
        };
        const finalConfig = { ...defaultConfig, ...config };
        console.log(finalConfig);
        const response = await axios.put(url, data, finalConfig);
        // console.log(response.data.data);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log("error " + axiosError);
        return { error: axiosError.response?.data || '0' };
    }
}
