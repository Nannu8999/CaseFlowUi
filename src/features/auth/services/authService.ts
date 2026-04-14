import api from "../../../api/axios";
import type { LoginRequest, LoginResponse } from "../types/authTypes";

export const Login = async (data: LoginRequest): Promise<LoginResponse> => {

    const response = await api.post('/Auth/login', data);

    return response.data;
}