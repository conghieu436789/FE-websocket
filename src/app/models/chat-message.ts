import {User} from './user';

export class ChatMessage {
  id?: number;
  content?: string;
  user_sender_id?:number;
  user_receiver_id?:number;
  sender?: User;
  receiver?: User;
}