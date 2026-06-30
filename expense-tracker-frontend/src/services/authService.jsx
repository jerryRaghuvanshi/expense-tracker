import api from "../api/ axios";


export async function loginUser(credentials) {

    const response = await api.post(
        "/auth/login",
        credentials
    );

    return response.data;

}

export async function registerUser(user) {

    const response = await api.post(
        "/auth/register",
        user
    );

    return response.data;

}