export interface IUser {
    id: number;
    password: string;
    login: string;
    name: string;
    birthdate?: string;
    bio?: string;
    local?: string;
    avatar?: any;
    banner?: any;
}