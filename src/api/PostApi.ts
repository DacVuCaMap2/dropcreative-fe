"use server"
import axios, { AxiosError } from 'axios';

export default async function PostApi(url: string, data: any, config?: any) {
    try {
        const response = await axios.post(url, data, config); 
        // console.log(response.data.data[0].base64);
        return response.data.data[0].base64;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log("error "+ axiosError);
        return { error: axiosError.response?.data || 'An error occurred' }; // Trả về đối tượng lỗi
    }
}
