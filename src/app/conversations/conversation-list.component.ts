import { Component, OnInit } from '@angular/core';
import { ConversationService } from './conversation.service';

@Component({
  selector: 'app-conversation-list',
  template: `
    <div *ngFor="let conversation of conversationService.conversations">
      <div class="conversation" *ngIf="(conversation.query.valueChanges | async )?.data.conversation as conv">
        <a routerLink="./{{ conv.id }}">
            <p>{{ conv.id }}</p>
            <p>{{ (conv.messages[conv.messages.length - 1])?.text  }}</p>
          </a>
      </div>
    </div>
  `,
  styles: [`
    .conversation {
      padding: 1em;
      border: 1px solid grey;
      border-radius: 1em;
    }
  `]
})
export class ConversationListComponent implements OnInit {

  constructor(
    public conversationService: ConversationService
  ) {}

  ngOnInit() {
  }

}
