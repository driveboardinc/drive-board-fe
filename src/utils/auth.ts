import Cookies from "js-cookie";

export const setAuthCookies = async (access: string, refresh: string, userType: string) => {
  document.cookie = `accessToken=${access}; path=/`;
  document.cookie = `refreshToken=${refresh}; path=/`;
  document.cookie = `userType=${userType}; path=/`;
};

export const clearAuthCookies = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

export const getAccessToken = () => Cookies.get("accessToken");
export const getRefreshToken = () => Cookies.get("refreshToken");
