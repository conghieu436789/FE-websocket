import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../service/message.service';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.css']
})
export class SocketComponent implements OnInit {
  input: any;
  user: any;
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
  sendMessage() {
      if (this.input) {
        this.messageService.sendMessage(this.input);
        this.input = '';
      }
    }
}
