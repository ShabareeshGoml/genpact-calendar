import axiosBase from "../../../axios";

export const fetchAllAgents = async () => {
  try {
    const response = await axiosBase.get(`/agents/list`);
    return response.data?.payload?.agents;
  } catch (error) {
    console.log(error);
  }
};

///agent/add-schedule/
export const addSchedule = async (schedule) => {
  try {
    const response = await axiosBase.post(`/agent/add-schedule/`, schedule);
    return response.data?.payload?.schedule_id;
  } catch (error) {
    console.log(error);
  }
};
