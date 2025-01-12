export const getBaseUrl = () => {
  return process.env.API_BASE_URL || "http://10.0.70.42:8000/api/v1";
};

export const getImageUrl = () => {
  return process.env.IMAGE_URL || "http://10.0.70.42:8000/";
};
