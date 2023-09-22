export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};
export type ILoginUser = {
  username: string;
  password: string;
};
