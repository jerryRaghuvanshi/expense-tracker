import api from "../api/ axios";


export async function getDashboard(month, year) {

    const response = await api.get("/analytics/dashboard", {
        params: {
            month,
            year
        }
    });

    return response.data;
}
export async function getBreakdown(month, year) {

    const response = await api.get("/analytics/breakdown", {
        params: {
            month,
            year
        }
    });

    return response.data;
}
