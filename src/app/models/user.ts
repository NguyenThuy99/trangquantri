import { Role } from "./role";
export class User {
    id: number;
    usename: string;
    password: string;
    role: Role;
    token?: string;
}