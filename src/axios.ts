import axios from 'axios'


const axiosInstance = axios.create({
    baseURL: 'https://api.real-estate-manager.redberryinternship.ge/api',

    headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
    }
})

export default axiosInstance