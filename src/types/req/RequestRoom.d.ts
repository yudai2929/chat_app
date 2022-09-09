import { Message } from '../Message';
import { Viewer } from '../Room';
import { Landlord } from '../Room';

export type RequestRoom = {
  messages?: Message[];
  updateAt: Date;
  viewer: Viewer;
  landlord: Landlord;
};
