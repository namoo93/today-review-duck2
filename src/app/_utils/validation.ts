// 이메일 정규식 (올바른 이메일 형식 체크)
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 비밀번호 정규식 (6~30자, 영문+숫자+특수문자 포함)
export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,30}$/;

/**
 * 이메일 유효성 검사
 * @param email 사용자가 입력한 이메일
 * @returns {string} 에러 메시지 (정상이면 빈 문자열)
 */
export const validateEmail = (email: string): string => {
  if (!email.trim()) return "이메일을 입력해주세요.";
  if (!emailRegex.test(email))
    return "앗! 이메일 주소 형식이 맞는지 다시 확인해주세요.";
  return ""; // 정상일 경우 빈 문자열 반환
};

/**
 * 비밀번호 유효성 검사
 * @param password 사용자가 입력한 비밀번호
 * @returns {string} 에러 메시지 (정상이면 빈 문자열)
 */
export const validatePassword = (password: string): string => {
  if (!password.trim()) return "비밀번호를 입력해주세요.";
  if (!passwordRegex.test(password))
    return "비밀번호는 6~30자, 영문+숫자+특수문자를 포함해야 합니다.";
  return ""; // 정상일 경우 빈 문자열 반환
};
