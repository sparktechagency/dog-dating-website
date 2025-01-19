const { jwtDecode } = require("jwt-decode");

export const decodedToken = (token) => {
  if (token) {
    return jwtDecode(token);
  }
};
