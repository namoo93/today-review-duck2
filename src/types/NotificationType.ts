export type Sender = {
  idx: string;
  email: string;
  nickname: string;
  profileImg: string | null;
  isMyFollowing: boolean;
};

export type NotificationCategory =
  | "follow_user"
  | "like_review"
  | "create_comment"
  | "like_comment"
  | "reply_comment"
  | "admin_notice"
  | string; // 확장 가능

export type NotificationType = {
  recipientIdx: string;
  sender: Sender;
  type: NotificationCategory;
  reviewIdx: number | null;
  commentIdx: number | null;
  content: string;
  createdAt: string;
  readAt: string | null;
};

export type NotificationResponse = {
  notifications: Notification[];
  totalPages?: number;
  currentPage?: number;
};
