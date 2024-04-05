import axiosBase from "../../axios";

export const fetchSlotsFromDate = async (date, agentId) => {
  try {
    const response = await axiosBase.get(`/slots/123/2024-04-07/`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const bookSlot = async () => {
  try {
  } catch (err) {}
};

export const getAgentList = async () => {
  try {
    const response = await axiosBase.get(`/agents/`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Credentials": true,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
