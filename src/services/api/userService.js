import axios from 'axios';
import * as ServiceConstants from './ServiceConstants';

const AddUser = (userObj) => {
    return axios.post(ServiceConstants.AddUserAPI, userObj);
};

const ValidateUserOTP = (OTPObj) => {
    return axios.post(ServiceConstants.ValidateUserOTPAPI, OTPObj);
};

const ResendUserOTP = (OTPObj) => {
    return axios.post(ServiceConstants.ResendUserOTPAPI, OTPObj);
};

const LoginUserOTP = (userObj) => {
    return axios.post(ServiceConstants.LoginUserOTPAPI, userObj);
};

export default {
    AddUser,
    ValidateUserOTP,
    ResendUserOTP,
    LoginUserOTP,
};
