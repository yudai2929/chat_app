import { Message } from './Message ';

export type Room = {
  message: Message;
  updateAt: string;
  viewer: viewer;
  landlord: landlord;
};

type viewer = {
  userName: string;
  id: string;
  imageUrl: string;
};

type landlord = {
  buildingName: string;
  id: string;
  imageUrl: string;
};
