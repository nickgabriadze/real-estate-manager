import axios from 'axios'


const axiosInstance = axios.create({
    baseURL: 'api.real-estate-manager.redberryinternship.ge',
    headers: {
        Authorization: `Bearer ${import.meta.env.API_ACCESS_TOKEN}`
    }
})

export default axiosInstance