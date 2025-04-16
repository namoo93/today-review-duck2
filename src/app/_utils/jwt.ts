function base64UrlDecode(str: string) {
  // base64url -> base64
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  // padding 추가
  const padding = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  return atob(str + padding);
}

export const decodeJWT = (token: string): { [key: string]: any } | null => {
  try {
    const payload = token.split(".")[1]; // 가운데 부분
    const decoded = base64UrlDecode(payload); // base64URL 디코딩
    return JSON.parse(decoded);
  } catch (error) {
    console.error("JWT 디코딩 실패:", error);
    return null;
  }
};
