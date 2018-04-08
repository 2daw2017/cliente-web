import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConversationListComponent } from './conversation-list.component';
import { ConversationDetailComponent } from './conversation-detail.component';

const routes: Routes = [
  { 
    path: '',
    component: ConversationListComponent,
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: ConversationDetailComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConversationsRoutingModule { }
