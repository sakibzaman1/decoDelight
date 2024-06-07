import axios from "axios";
import React from "react";

const axiosPublic = axios.create({
  baseURL: `https://deco-delight-server.vercel.app`,
});

const UseAxiosPublic = () => {
  return axiosPublic;
};

export default UseAxiosPublic;
