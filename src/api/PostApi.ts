"use server"
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';

export default async function PostApi(url: string, data: any, config?: any) {
    const cookie = cookies();
    const jwt = cookie.get("auth_token")?.value;
    
    if (url =="https://api.freepik.com/v1/ai/text-to-image") {
        config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+jwt,
                Accept: 'application/json',
                'x-freepik-api-key': 'FPSXa66c58ab5a6c4635a8af2f04aa36a57f'
            }
        };
    }
    try {
        const response = await axios.post(url, data, config); 
        // console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log("error "+ axiosError);
        return { error: axiosError.response?.data || 'An error occurred' }; // Trả về đối tượng lỗi
    }
}
