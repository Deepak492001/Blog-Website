import axios from "axios";
import BASE_URL from './config';

export const getAllCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/all-categories`);
        return response.data;
    } catch (error) {
console.log(error.message);
    }
}