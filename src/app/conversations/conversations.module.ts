import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PrimeNGModule } from '../shared/primeng.module';

import { ConversationsRoutingModule } from './conversations-routing.module';
import { ConversationListComponent } from './conversation-list.component';
import { ConversationDetailComponent } from './conversation-detail.component';
import { ConversationService } from './conversation.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PrimeNGModule,
    ConversationsRoutingModule,
  ],
  declarations: [
    ConversationListComponent,
    ConversationDetailComponent
  ],
  providers: [
    ConversationService
  ]
})
export class ConversationsModule { }
