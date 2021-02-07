import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../service/message.service';
import {UserService} from '../../service/user.service';
import {ChatMessage} from '../../models/chat-message';

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.css']
})
export class SocketComponent implements OnInit {
  input!: string;
  user: any;
  friend: any;
  // @ts-ignore
  friends: any[];
  username: any;
  constructor(
    public messageService: MessageService,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem("AuthUsername");
    this.getUser();
    this.getAllFriends();
  }

  getAllFriends() {
    if(this.username) {
      this.userService.getAllFriends(this.username).subscribe(data => {
          console.log(data);
          this.friends = data;
        },
        error => {
          console.log(error);
        });
    }
  }
  getUser() {
    if (this.username) {
      this.userService.getUser(this.username).subscribe(data => {
        console.log(data);
        this.user = data;
      }, error => {
        console.log(error);
      });
    }

  }
  // sendMessage() {
  //     if (this.input) {
  //       this.messageService.sendMessage(this.input);
  //       this.input = '';
  //     }
  // }

  getUserChatTo(friend: any) {
    // console.log(this.user.id);
    this.friend = friend;
    // console.log(this.friend.id);
    this.messageService.initializeWebSocketConnection(this.user.id, this.friend.id);
  }
  sendMessage() {
    // console.log(this.user.id);
    // console.log(this.friend.id);
    if (this.input) {
      let chatMessage:ChatMessage = {
        content: this.input,
        sender:  this.user,
        receiver: this.friend,
        // user_sender_id: this.user.id,
        // user_receiver_id: this.friend.id
      }
      this.messageService.sendMessageTo(this.user.id, this.friend.id, chatMessage);
      this.input = '';
    }
  }
}
