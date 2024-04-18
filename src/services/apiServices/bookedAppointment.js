import axiosBase from "../../../axios";

export const fetchBookedSlotsOfCustomer = async (cusId) => {
  try {
    const response = await axiosBase.get(`/appointments/${cusId}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const cancelBookedSlotsOfCustomer = async (appID, reason) => {
  try {
    const response = await axiosBase.post(
      `/cancel_appointment/${appID}?reason=${reason}`
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
