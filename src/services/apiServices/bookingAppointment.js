import axiosBase from "../../../axios";

export const fetchAvailableSlots = async (
  productId,
  date,
  type,
  selectedAgent
) => {
  try {
    console.log(productId, date, selectedAgent, type, "llo");
    const response = await axiosBase.get(
      `/slots/${productId}/${date}${
        selectedAgent ? `?agent_id=${selectedAgent}` : ""
      }`,
      {
        headers: { type: type },
      }
    );
    return response?.data?.payload?.slots;
  } catch (error) {
    console.log(error);
  }
};
export const createAppointment = async (schedule) => {
  try {
    const response = await axiosBase.post(`/appointment/create`, schedule);
    return response?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
///appointment/create

export const createCustomerId = async (customer) => {
  try {
    const response = await axiosBase.post(`/customer/create`, customer);
    return response?.data?.payload?.customer_id;
  } catch (error) {
    console.log(error);
  }
};

export const bookTimeSlot = async (schedule) => {
  try {
    const response = await axiosBase.post(
      `/customer/book_appointment`,
      schedule
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCustomerDetails = async (cusID) => {
  try {
    const response = await axiosBase.get(`/userDetail/${cusID}`);
    let data = response?.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAgent = async (prodId, date, time) => {
  try {
    const response = await axiosBase.get(
      `/slots/${prodId}/${date}?slot_time=${time}`
      // ,
      // {
      //   headers: { type: "agent" },
      // }
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAppointmentDetails = async (appID) => {
  try {
    const response = await axiosBase.get(`/appointments/description/${appID}`, {
      headers: { type: "agent" },
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

///update_appointment/3

export const updateAppointment = async (appID, schedule) => {
  try {
    const response = await axiosBase.post(
      `/update_appointment/${appID}`,
      schedule
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
