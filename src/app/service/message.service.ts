import { Injectable } from '@angular/core';

// @ts-ignore
declare var SockJS;

// @ts-ignore
declare var Stomp;
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() {
    this.initializeWebSocketConnection();
  }
  // @ts-ignore
  public stompClient;
  public msg = [];
  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8080/socket';
    const ws = new SockJS(serverUrl);
    console.log(ws);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function(frame: any) {
      console.log(frame)
      that.stompClient.subscribe('/message', (message: any) => {
        console.log(message);
        if (message.body) {
          // @ts-ignore
          that.msg.push(message.body);
        }
      });
    });
  }

  sendMessage(message: any) {
    this.stompClient.send('/app/send/message' , {}, message);
  }
}
