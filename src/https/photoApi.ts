import axiosInstance from './axiosInstance';

export const photoApi = {
  getDishPhoto: (dishName: string): Promise<string> =>
    axiosInstance.get(`/photo/dishPhoto/${dishName}`),
};
