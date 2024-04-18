import axiosBase from "../../../axios";

export const fetchCancelledAppointmentsOfAgent = async (agentId) => {
  try {
    const response = await axiosBase.post(
      `/list/cancelled_appointments/${agentId}`
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

///cancelled_appointments/5
