import api from "../api/ axios";

export async function getExpenses(page, keyword, categoryId, month, year, sort) {

    const response = await api.get("/expenses", {

        params: {
            page, size: 10, sort: "expenseDate,desc", keyword, categoryId, month, year, sort
        }

    });

    return response.data;

}
export async function addExpense(expense) {

    const response = await api.post(
        "/expenses",
        expense
    );

    return response.data;

}
export async function updateExpense(id, expense) {

    const response = await api.put(

        `/expenses/${id}`,

        expense

    );

    return response.data;

}
export async function deleteExpense(id) { await api.delete(`/expenses/${id}`); }