import { Message } from './Message ';

export type Room = {
  message?: Message;
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
