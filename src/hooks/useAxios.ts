import axios, { AxiosInstance } from "axios";
import { useSession } from "next-auth/react";

const baseURL = process.env.NEXTAUTH_URL;

const useAxios = () => {
  const { data: session } = useSession();
  const $http: AxiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return $http;
};

export default useAxios;
