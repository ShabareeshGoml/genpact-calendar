import axiosBase from "../../../axios";

export const fetchBookedSlotsOfCustomer = async (cusId) => {
  try {
    const response = await axiosBase.get(`/appointments/${cusId}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const cancelBookedSlotsOfCustomer = async (appID) => {
  try {
    const response = await axiosBase.post(`/cancel_appointment/${appID}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
