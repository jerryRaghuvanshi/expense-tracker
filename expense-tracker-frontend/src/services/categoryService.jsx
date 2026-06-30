import api from "../api/ axios";

export async function getCategories() {

    const response = await api.get("/categories");

    return response.data;

}

export async function addCategory(category) {

    const response = await api.post(
        "/categories",
        category
    );

    return response.data;

}

export async function updateCategory(id, category) {

    const response = await api.put(
        `/categories/${id}`,
        category
    );

    return response.data;

}

export async function deleteCategory(id) {

    await api.delete(`/categories/${id}`);

}