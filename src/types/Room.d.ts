import { Message } from './Message';

export type Room = {
  id: string;
  messages: Message[];
  updateAt: Date;
  viewer: Viewer;
  landlord: Landlord;
};

export type Viewer = {
  userName: string;
  id: string;
  imageUrl: string;
};

export type Landlord = {
  buildingName: string;
  id: string;
  imageUrl: string;
};
