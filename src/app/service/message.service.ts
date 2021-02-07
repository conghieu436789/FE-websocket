import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

// @ts-ignore
declare var SockJS;

// @ts-ignore
declare var Stomp;
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http: HttpClient
  ) {
    // this.initializeWebSocketConnection();
  }
  // @ts-ignore
  public stompClient;
  public msg = [];
  // initializeWebSocketConnection() {
  //   const serverUrl = 'http://localhost:8080/socket';
  //   const ws = new SockJS(serverUrl);
  //   console.log(ws);
  //   this.stompClient = Stomp.over(ws);
  //   const that = this;
  //   // tslint:disable-next-line:only-arrow-functions
  //   this.stompClient.connect({}, function(frame: any) {
  //     console.log(frame)
  //     that.stompClient.subscribe('/message', (message: any) => {
  //       console.log(message);
  //       if (message.body) {
  //         // @ts-ignore
  //         that.msg.push(message.body);
  //       }
  //     });
  //   });
  // }

  public initializeWebSocketConnection(senderId: any, receiverId: any) {
    const serverUrl = 'http://localhost:8080/socket';
    const ws = new SockJS(serverUrl);
    console.log(ws);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function(frame: any) {
      console.log(frame)
      that.stompClient.subscribe(`/message/${senderId}/${receiverId}`, (message: any) => {
        console.log(message);
        let data = JSON.parse(message.body)
        console.log(data);
        if (data) {
          // @ts-ignore
          that.msg.push(data);
        }
      });
    });
  }

  // sendMessage(message: any) {
  //   this.stompClient.send('/app/send/message' , {}, message);
  // }
  sendMessageTo(senderId:any, receiverId: any, chatMessage: any) {
    console.log(chatMessage);
    this.stompClient.send('/app/send/message/'+ senderId + '/' + receiverId, {}, JSON.stringify(chatMessage));
  }
}
