export interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface FormState {
    name: string;
    email: string;
    phone: string;
    address: string;
}