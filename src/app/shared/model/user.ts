export interface User {
    id?: string;
    fullName?: string;
    email?: string;
    names?: string;
    lastName?: string;
    birthDate?: Date;
    token?: string;
    urlPhoto?: string;
    sexo?: string;
    type?: string;
    status?: string;
    address?: {
        mainStreet?: string,
        intersection?: string,
        phone?: string;
        convetional?: string;
    };
    company?: User;
}
