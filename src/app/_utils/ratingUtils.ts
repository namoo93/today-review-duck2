// 등록된 리뷰의 평가 값 텍스트로 변환
export const getRatingText = (score: number): string => {
  const ratingMap: Record<number, string> = {
    0: "매우 화남",
    1: "많이 화남",
    2: "조금 화남",
    3: "좋음",
    4: "아주 좋음",
    5: "매우 좋음",
  };

  return ratingMap[score] ?? "평가 없음";
};

// 텍스트 평가 값을 숫자로 변환
export const getRatingValue = (text: string): number => {
  const valueMap: Record<string, number> = {
    "매우 화남": 0,
    "많이 화남": 1,
    "조금 화남": 2,
    좋음: 3,
    "아주 좋음": 4,
    "매우 좋음": 5,
  };

  if (text in valueMap) {
    return valueMap[text];
  }

  throw new Error(`유효하지 않은 평가 텍스트입니다: "${text}"`);
};

// 공지사항 카테고리 값
export const category = (num: number | string) => {
  switch (num) {
    case 1:
      return "업데이트";
    case 2:
      return "이벤트";
    case 3:
      return "규정 변경";
    case 4:
      return "시스템 점검";
    case 5:
      return "기타";
    default:
      return "업데이트";
  }
};
