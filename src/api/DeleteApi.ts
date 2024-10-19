"use server"
import axios, { AxiosError } from 'axios';

export default async function DeleteApi(url: string,config?: any) {
    try {
        const defaultConfig = {};
        const finalConfig = { ...defaultConfig, ...config };
        const response = await axios.delete(url, finalConfig);
        // console.log(response.data.data);
        return response;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log("error " + axiosError);
        return { error: axiosError.response?.data || '0' };
    }
}
