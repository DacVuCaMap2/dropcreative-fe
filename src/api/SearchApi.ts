import {  ParamsSearchProduct } from '@/types/common';
import axios from './axiosConfig';
import qs from 'qs';


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

export {
    searchProduct
};