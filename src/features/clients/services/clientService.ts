import api from "../../../api/axios";

export const getClients = async () => {
    const response = await api.get("/Client");
    return response.data;
};

export const getClientById = async (id: number) => {
    const response = await api.get(`/Client/${id}`);
    return response.data;
};

export const createClient = async (data: any) => {
    const response = await api.post("/Client", data);
    return response.data;
};

export const updateClient = async (id: number, data: any) => {
    const response = await api.put(`/Client/${id}`, data);
    return response.data;
};

export const deleteClient = async (id: number) => {
    const response = await api.delete(`/Client/${id}`);
    return response.data;
};