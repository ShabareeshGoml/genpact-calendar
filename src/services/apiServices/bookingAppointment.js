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
