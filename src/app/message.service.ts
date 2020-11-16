import { Injectable } from '@angular/core';
/**
 * Messages for User
 * Used by HTTP Error Handling
 */

@Injectable()
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
