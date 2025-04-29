interface KakaoShareType {
  sendDefault: (options: any) => void;
}

interface KakaoType {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Share: KakaoShareType;
}

interface Window {
  Kakao?: KakaoType;
}
