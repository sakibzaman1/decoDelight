import axios from 'axios';
import React from 'react';

const UseAxiosSecure = () => {

    const axiosSecure = axios.create({
        baseURL : 'https://deco-delight-server.vercel.app'
    })
    return axiosSecure;
};

export default UseAxiosSecure;