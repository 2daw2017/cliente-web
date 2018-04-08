import { Component, OnInit, ViewChild, ElementRef, Query } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from "rxjs";

import { Conversation } from '../shared/models';
import { ConversationService } from './conversation.service';
import { QueryRef } from 'apollo-angular';
import { Subscription } from 'apollo-client/util/Observable';

@Component({
  selector: 'app-conversation-detail',
  template: `
    <div class="ui-g">
      <div class="ui-g-12">
        <p-toolbar>
          <div class="ui-toolbar-group-left">
              <button pButton type="button" label="New" icon="fa-plus"></button>
              <button pButton type="button" label="Open" icon="fa-folder-open"></button>
                  
              <i class="fa fa-bars"></i>
          </div>
        
          <div class="ui-toolbar-group-right">
              <button pButton type="button" icon="fa-search"></button>
              <i class="fa fa-bars"></i>
              <button pButton type="button" icon="fa-refresh"></button>
              <button pButton type="button" icon="fa-trash"></button>
          </div>
        </p-toolbar>
      </div>

      <div #messagesContainer class="ui-g-12" style="height: 85vh; overflow-y: scroll">
            <div *ngFor="let message of conversation?.messages">{{message.text}}</div>
      </div>

      <div class="ui-g-12">
        <form #addMessageForm="ngForm" (ngSubmit)="addMessage(addMessageForm)">
          <div class="ui-inputgroup">
            <input pInputText type="text" class="ui-g-11" placeholder="Send a new message" name="text" ngModel>
            <button pButton type="submit" class="ui-g-1" icon="fas fa-paper-plane"></button>
          </div>
        </form>
      </div>

    </div>
  `,
  styles: []
})
export class ConversationDetailComponent implements OnInit {
  
  @ViewChild('messagesContainer') private messagesContainer: ElementRef;

  conversationQuery: QueryRef<any>;
  conversationSubscription: Subscription;
  conversation$: Observable<any>;
  conversation: Conversation;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private conversationService: ConversationService,
  ) { }
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.conversationQuery = this.conversationService.getConversation(params.get('id'));
      this.conversationService.subscribeToNewMessagesOn(this.conversationQuery,  { id: params.get('id') });
      // this.conversation$ = this.conversationQuery.valueChanges;
      this.conversationQuery.valueChanges.subscribe(({data}) => {
        this.conversation = data.conversation;
      })
    });
  }

  ngOnDestroy() {
    return this.conversationSubscription.unsubscribe();
  }
  
  ngAfterViewChecked() {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) { }             
  }

  addMessage(form) {
    event.preventDefault();
    this.conversationService.sendMessage(this.conversation.id, form.value.text).subscribe(({data}) => {
      form.reset();
    });
  }

}
