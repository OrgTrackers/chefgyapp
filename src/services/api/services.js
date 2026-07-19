import axios from 'axios';
import * as ServiceConstants from './ServiceConstants';

const GetUserServices = (id) => {
    return axios.get(`${ServiceConstants.GetUserServicesApi}${id}/`);
}

const GetAllEventTypes = () => {
    return axios.get(ServiceConstants.GetAllEventTypesApi);
}

const GetAllAddressesById = (id) => {
    // Ensure we don't end up with a double slash before the query string
    const base = ServiceConstants.GetAllAddressesById.replace(/\/?$/, '');
    const url = `${base}?user_id=${encodeURIComponent(id)}`;
    return axios.get(url).catch(err => {
        console.error('GetAllAddressesById failed:', err?.response || err.message || err);
        throw err;
    });
}

const UpdateAddress = (payload) => {
    // payload is expected to be the full address object including id
    const base = ServiceConstants.UpdateAddressApi.replace(/\/?$/, '');
    const url = `${base}`;
    return axios.post(url, payload).catch(err => {
        console.error('UpdateAddress failed:', err?.response || err.message || err);
        throw err;
    });
}

const CreateAddress = (payload) => {
    const base = ServiceConstants.AddAddressApi.replace(/\/?$/, '');
    const url = `${base}`;
    return axios.post(url, payload).catch(err => {
        console.error('CreateAddress failed:', err?.response || err.message || err);
        throw err;
    });
}

const DeleteAddress = (id) => {
    const base = ServiceConstants.DeleteAddressApi.replace(/\/?$/, '');
    const url = `${base}/${encodeURIComponent(id)}/`;
    return axios.delete(url).catch(err => {
        console.error('DeleteAddress failed:', err?.response || err.message || err);
        throw err;
    });
}

const SearchVendors = (latitude, longitude) => {
    return axios
        .get(ServiceConstants.SearchVendorsApi, {
            params: { latitude, longitude },
        })
        .catch(err => {
            console.error('SearchVendors failed:', err?.response || err.message || err);
            throw err;
        });
}

export default {
    GetUserServices,
    GetAllEventTypes,
    GetAllAddressesById,
    UpdateAddress,
    CreateAddress,
    DeleteAddress,
    SearchVendors,
};

