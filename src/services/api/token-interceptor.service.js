import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const tokenInterceptor = async (config) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const noTokenEndpoints = [
            '/login',
            // Add more endpoints that do not require a token
        ];
        const needsToken = !noTokenEndpoints.some(endpoint => config.url.includes(endpoint));
        if (needsToken) {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
            }
        }
        return config;
    } catch (error) {
        console.error('Error in tokenInterceptor:', error);
        return Promise.reject(error);
    }
};

axios.interceptors.request.use(
    (config) => tokenInterceptor(config),
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Response error:', error);
        return Promise.reject(error);
    }
);

export default axios;