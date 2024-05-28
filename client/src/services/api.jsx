import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000';

// Fetch movies by mood from the API
export const getMovie = async (mood) => {
    try {
        const response = await axios.get(`${BASE_URL}/recomendar`, {
            params: { mood },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}