import api from "../api/ axios";

export async function getBudgets() {

    const response = await api.get("/budgets");

    return response.data;

}

export async function addBudget(budget) {

    const response = await api.post(
        "/budgets",
        budget
    );

    return response.data;

}

export async function updateBudget(id, budget) {

    const response = await api.put(
        `/budgets/${id}`,
        budget
    );

    return response.data;

}

export async function deleteBudget(id) {

    await api.delete(`/budgets/${id}`);

}