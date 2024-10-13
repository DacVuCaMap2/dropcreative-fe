"use server"
import axios, { AxiosError } from 'axios';

export default async function GetApi(url: string, config?: any) {
    try {
        const defaultConfig = {};
        const finalConfig = { ...defaultConfig, ...config };
        const response = await axios.get(url, config);
        // console.log(response.data.data);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log("error " + axiosError);
        return { error: axiosError.response?.data || '0' };
    }
}
