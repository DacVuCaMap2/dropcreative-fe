"use server"
import axios, { AxiosError } from 'axios';
import React from 'react'
import GetApi from './GetApi';
import { message } from 'antd';
import { cookies } from 'next/headers';
import PostApi from './PostParttern';

export default async function apiHandlePixel(id: any, accountId: any, productId: any) {
    //get pixel from server
    const url = process.env.NEXT_PUBLIC_API_URL + "/api/facebook/getByPixel/" + id;
    let response = await GetApi(url);
    if (response?.status === 200 && response?.object) {
        const data = response.object.facebookPixel;
        const accessToken = data.accessToken;
        const businessId = data.businessId;
        const pixelId = data.value;
        const xs = response.object.xs;
        const cuser = response.object.cuser;
        const cookie = cookies();
        const jwt = cookie.get("auth_token")?.value;
        let errResponse: any = null;
        const responseArr: any[] = [];
        let accountIdArr: string[] = accountId.split("\n");
        //check trung lap
        const uniqueIds = new Set<string>();
        const duplicates: string[] = [];

        for (const accountId of accountIdArr) {
            if (uniqueIds.has(accountId)) {
                duplicates.push(accountId); // Nếu đã thấy, thêm vào mảng duplicates
            } else {
                uniqueIds.add(accountId); // Nếu chưa thấy, thêm vào Set
            }
        }

        if (duplicates.length > 0) {
            console.log("Có phần tử trùng nhau:", duplicates);
        } else {
            console.log("Không có phần tử nào trùng nhau.");
        }
        if (duplicates.length > 0) {
            return { status: 400, message: "duplicate account id" }
        }
        accountIdArr = accountIdArr.filter(str => str);
        const cookieSend = `c_user=${cuser};xs=${xs}`
        if (accountIdArr.length > 5) {
            return { status: 400, message: "less than 5 account id" }
        }
        for (const account of accountIdArr) {

            try {
                const defaultConfig = {
                    headers: {
                        Cookie: cookieSend
                    }
                };
                const urlPost = `https://graph.facebook.com/v21.0/${pixelId}/shared_accounts?access_token=${accessToken}&account_id=${account}&business=${businessId}&method=post&locale=en_US`;
                response = await axios.get(urlPost, defaultConfig);
                if (response?.data.success) {
                    responseArr.push(account);
                }

            } catch (error) {
                const axiosError = error as AxiosError;
                errResponse = axiosError.response?.data || "error";

            }
        }

        if (responseArr.length > 0) {
            const urlAddSharePixel = process.env.NEXT_PUBLIC_API_URL + "/api/facebook/addPixelAccount"
            const postShareData = responseArr.map(((res: any, index) => {
                return { value: res, productId: productId, pixelId: id };
            }))
            const responseSharePixel = await PostApi(urlAddSharePixel,postShareData);
            console.log(responseSharePixel);
            if (responseSharePixel?.status===400) {
                return {status:400,message:responseSharePixel.message}
            }
            if (responseSharePixel.status===200) {
                return { status: 200, data: responseArr };
            }
        }
        else {
            return errResponse;
        }
        /// success all


    }
    else if (response?.message) {
        return { status: 400, message: response.message }
    }
    else {
        return { stattus: 400, message: "failed" }
    }

}


