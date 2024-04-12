///appointments/list/
import axiosBase from "../../../axios";

export const fetchBookedSlotsOfAgent = async (agentId) => {
  try {
    const response = await axiosBase.get(`/appointments/list/${agentId}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
