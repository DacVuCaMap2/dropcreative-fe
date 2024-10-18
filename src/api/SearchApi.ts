import {  ParamsSearchProduct, TypeResponse } from '@/types/common';
import axios from './axiosConfig';
import qs from 'qs';
import { AxiosResponse } from 'axios';


const searchProduct = (params: ParamsSearchProduct) => {
    const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined)
      );
    return axios.get('/api/product', {
      params:filteredParams,
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    });
  };

const getProductDetail = (id:number):Promise<AxiosResponse<TypeResponse>> => {
    return axios.get(`/api/product/${id}`); 
};

export {
    searchProduct,
    getProductDetail
};