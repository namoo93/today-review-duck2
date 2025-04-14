// 등록된 리뷰의 평가 값 텍스트로 변환
export const getRatingText = (score: number): string => {
  const ratingMap: Record<number, string> = {
    1: "매우 화남",
    2: "많이 화남",
    3: "조금 화남",
    4: "좋음",
    5: "아주 좋음",
    6: "매우 좋음",
  };

  return ratingMap[score] ?? "평가 없음";
};

// 텍스트 평가 값을 숫자로 변환
export const getRatingValue = (text: string): number => {
  const valueMap: Record<string, number> = {
    "매우 화남": 1,
    "많이 화남": 2,
    "조금 화남": 3,
    좋음: 4,
    "아주 좋음": 5,
    "매우 좋음": 6,
  };

  if (text in valueMap) {
    return valueMap[text];
  }

  throw new Error(`유효하지 않은 평가 텍스트입니다: "${text}"`);
};
