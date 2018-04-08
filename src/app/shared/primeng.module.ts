import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { GrowlModule } from 'primeng/growl';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/components/common/messageservice';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  imports: [
    ButtonModule,
    GrowlModule,
    InputTextModule,
    ScrollPanelModule,
    ToolbarModule,
  ],
  exports: [
    ButtonModule,
    GrowlModule,
    InputTextModule,
    ScrollPanelModule,
    ToolbarModule,
  ], 
  providers: [
    MessageService,
  ]
})
export class PrimeNGModule { }
