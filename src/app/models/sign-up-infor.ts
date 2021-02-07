export class SignUpInfor {
  username: string;
  roles: any[];
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.roles = [
      {
      name: 'user'
      }
    ];
    this.password = password;
  }
}
