import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  // Mock data
  user: any = {
    id: "5ac4f8889ec9b91f7408bd88",
    conversations: [
      { id: "5ac4f8d302a2782290be915b" }
    ]
  }

  constructor() { }

  getUser() {
    return this.user;
  }

  getConversations() {
    return this.user.conversations;
  }


}
