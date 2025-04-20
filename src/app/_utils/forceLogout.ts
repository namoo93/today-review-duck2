import { removeAuthorityCookie } from "@/app/_utils/cookies";

export const forceLogout = () => {
  removeAuthorityCookie("accessToken");
  removeAuthorityCookie("refreshToken");
  removeAuthorityCookie("nickname");
};
