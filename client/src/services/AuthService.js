import { httpService } from "./HttpService";

const BASE_URL = "auth/";

const loginWithToken = async () => {
  const user = await httpService.post(BASE_URL + "loginWithToken");
  return user;
};

const login = async (email, password) => {
  const user = await httpService.post(BASE_URL + "login", { email, password });
  return user;
};

const logout = async () => {
  await httpService.post(BASE_URL + "logout");
};


export const AuthService = {
  login,
  logout,
  loginWithToken,
};