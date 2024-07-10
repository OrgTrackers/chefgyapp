import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const errorHandlerInterceptor = async (error) => {
    const navigation = useNavigation();
    if (error.response && error.response.status === 401) {
        console.log('Unauthorized request. Logging out user or handling as per application logic.');
        try {
            await AsyncStorage.clear();
            console.log('AsyncStorage cleared successfully.');
            navigation.navigate('Home');
        } catch (clearError) {
            console.error('Error clearing AsyncStorage:', clearError);
        }
    } else if (error.response) {
        console.error('Response error:', error.response.data); // Log the detailed error response
    } else if (error.request) {
        console.error('Request error:', error.request); // Log the request error (e.g., no response received)
    } else {
        console.error('Error:', error.message); // Log any other errors
    }

    return Promise.reject(error); // Always return a rejected promise to propagate the error
};

axios.interceptors.response.use(
    (response) => response,
    errorHandlerInterceptor
);

export default axios;
