import React from 'react'

export default function ResponseHandle(response:any) {
    if (response?.status===200) {
        return {status:200,data:response.data}
    }
    else if(response?.message){
        return {status:400,message:response.message}
    }
    else{
        return {status:400,message:response.message}
    }
}
