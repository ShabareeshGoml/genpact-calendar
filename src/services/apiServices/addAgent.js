import axiosBase from "../../../axios";

export const createAgent = async (agent) => {
  try {
    const response = await axiosBase.post(`/agent/create`, agent);
    return response?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
