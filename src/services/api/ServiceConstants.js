export const ServiceApi = "http://103.212.120.38:5001/api/";

export const AddUserAPI = ServiceApi + "user/register/";
export const ValidateUserOTPAPI = ServiceApi + "user-otp/validate-otp/";
export const ResendUserOTPAPI = ServiceApi + "user-otp/resend-otp/";
export const LoginUserOTPAPI = ServiceApi + "user/login/";

// user services 
export const GetUserServicesApi = ServiceApi + "services/";
export const GetAllEventTypesApi = ServiceApi + "event-types/all/";
export const GetAllAddressesById = ServiceApi + "customer-address/get-all/";
export const UpdateAddressApi = ServiceApi + "customer-address/update/";
export const AddAddressApi = ServiceApi + "customer-address/add/";
export const DeleteAddressApi = ServiceApi + "customer-address/delete/";
export const SearchVendorsApi = ServiceApi + "vendors/search";
export const UploadsBaseUrl = "http://103.212.120.38:5001/";