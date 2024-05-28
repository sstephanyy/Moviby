import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000';

export const getMovie = async (mood) => {
    try {
        console.log('Fetching movies for mood:', mood);


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