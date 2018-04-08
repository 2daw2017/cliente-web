import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/conversations', pathMatch: 'full' },
  { path: 'conversations', loadChildren: "app/conversations/conversations.module#ConversationsModule" },
  // { path: 'conversation/:id', component: ConversationDetailComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // enableTracing: true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
