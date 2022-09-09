import { Timestamp } from '@firebase/firestore';

export type Message = {
  createAt: Timestamp;
  isRead: boolean;
  postUser: string;
  text: string;
};
