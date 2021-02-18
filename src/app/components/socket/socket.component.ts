import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../service/message.service';
import {UserService} from '../../service/user.service';
import {ChatMessage} from '../../models/chat-message';
import {ChatRoomService} from '../../service/chat-room.service';
import {ChatMessageService} from '../../service/chat-message.service';
import {User} from '../../models/user';
// @ts-ignore
declare var $;
// @ts-ignore
declare var SockJS;
// @ts-ignore
declare var Stomp;

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
  chatroom: any;
  chatMessages!: any[];
  // @ts-ignore
  public stompClient;
  constructor(
    public messageService: MessageService,
    public userService: UserService,
    public chatRoomService: ChatRoomService,
    public chatMessageService: ChatMessageService
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
    console.log(this.friend);
    this.chatRoomService.getRoomByIds(this.user.id, this.friend.id).subscribe(data => {
      this.chatroom = data;
      console.log(data);
      this.chatMessageService.getChatMessageByRoomId(this.chatroom.id).subscribe(data => {
        this.chatMessages = data;
        console.log(data);
        this.disconnectSocket();
        this.initializeWebSocketConnection(this.chatroom.name);
      }, error => {
        console.log(data);
      });
    }, error => {
      console.log(error);
    });
    $('#chatForm').collapse('show');
    // var d = $('#chat-history');
    // d.scrollTop(d.prop("scrollHeight"));
    // $('#chat-history').scrollTop($('#chat-history').prop("scrollHeight"))
    $("#chat-history").animate({ scrollTop: $('#chat-history').prop("scrollHeight")}, 500);
  }

  closeChat() {
    this.disconnectSocket();
    this.friend = {};
    console.log(this.friend);
    $('#chatForm').collapse('hide');
  }
  // getRoomChat(friend: any) {
  //   // console.log(this.user.id);
  //   this.friend = friend;
  //   // console.log(this.friend.id);
  //   this.messageService.initializeWebSocketConnection(this.user.id, this.friend.id);
  // }

  sendMessage() {
    // console.log(this.user.id);
    // console.log(this.friend.id);
    if (this.input) {
      let chatMessage:ChatMessage = {
        content: this.input,
        sender:  this.user,
        receiver: this.friend,
        chat_room_id: this.chatroom.id,
        user_sender_id: this.user.id,
        user_receiver_id: this.friend.id
      }
      this.sendMessageTo(chatMessage);
      this.input = '';
    }
  }


  public initializeWebSocketConnection(roomChatName: any) {
    const serverUrl = 'http://localhost:8080/socket';
    const ws = new SockJS(serverUrl);
    console.log(ws);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function(frame: any) {
      console.log(frame)
      that.stompClient.subscribe(`${roomChatName}`, (message: any) => {
        console.log(message);
        let data = JSON.parse(message.body)
        console.log(data);
        if (data) {
          // @ts-ignore
          that.chatMessages.push(data);
        }
      });
    });
  }

  disconnectSocket() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected")
  }

  sendMessageTo(chatMessage: any) {
    console.log(chatMessage);
    this.stompClient.send('/app/send/message/'+ this.chatroom.id, {}, JSON.stringify(chatMessage));
  }
}
