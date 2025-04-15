const STORAGE_KEY = "searchHistory";

export const getSearchHistory = (): string[] => {
  if (typeof window === "undefined") return [];
  const history = localStorage.getItem(STORAGE_KEY);
  return history ? JSON.parse(history) : [];
};

export const setSearchHistory = (keyword: string): string[] => {
  if (typeof window === "undefined") return [];

  let history = getSearchHistory();

  // 중복 제거 후 맨 앞에 추가
  history = [keyword, ...history.filter((item) => item !== keyword)];

  // 6개 초과 시 잘라내기
  if (history.length > 6) {
    history = history.slice(0, 6);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return history;
};

export const removeSearchHistoryItem = (keyword: string): string[] => {
  const history = getSearchHistory().filter((item) => item !== keyword);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return history;
};

export const clearSearchHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};
