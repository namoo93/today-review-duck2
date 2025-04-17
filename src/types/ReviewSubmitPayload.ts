export type ReviewSubmitPayload = {
  title: string;
  content: string;
  score: number;
  tags: string[];
  thumbnail: string | null;
  thumbnailContent: string | null;
  images?: {
    imgPath: string | null;
    content: string | null;
  }[];
};
