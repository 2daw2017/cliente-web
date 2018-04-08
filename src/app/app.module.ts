import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { GraphQLModule } from './shared/graphql.module';
import { PrimeNGModule } from './shared/primeng.module';
import { AuthService } from './shared/services/auth.service';
// import { ConversationService } from './conversations/conversation.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    GraphQLModule,
    PrimeNGModule,
  ],
  providers: [
    AuthService,
    // ConversationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
