import axiosBase from "../../axios";

export const fetchSlotsFromDate = async (date, agentId) => {
  try {
    const response = await axiosBase.get(`/slots/${agentId}/${date}/`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const bookSlot = async (body) => {
  try {
    const response = await axiosBase.put(`/book-slot/`, body);
    return response;
  } catch (err) {
    console.log(error);
  }
};

export const getAgentList = async () => {
  try {
    const response = await axiosBase.get(`/agents/`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
