export const getBaseUrl = () => {
  return process.env.API_BASE_URL || "http://10.0.70.38:8000/api/v1";
};

export const getImageUrl = (key) => {
  return process.env.IMAGE_URL || "http://10.0.70.38:8000/";
};
