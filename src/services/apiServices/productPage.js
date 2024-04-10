import axiosBase from "../../../axios";

export const fetchAllProductList = async () => {
  try {
    const response = await axiosBase.get(`/products/`);
    return response?.data?.payload?.products;
  } catch (error) {
    console.log(error);
  }
};
