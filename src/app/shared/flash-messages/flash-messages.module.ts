import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashMessagesComponent } from '@app/shared/flash-messages/flash-messages.component';
import { FlashMessagesDirective } from './flash-messages.directive';
import { SimpleFlashMessagesComponent } from '@app/shared/flash-messages/simple-flash-messages/simple-flash-messages.component';
import { FlashMessagesService } from '@app/shared/flash-messages/flash-messages.service';

@NgModule({
  imports: [CommonModule],
  exports: [FlashMessagesComponent],
  declarations: [
    FlashMessagesComponent,
    SimpleFlashMessagesComponent,
    FlashMessagesDirective
  ],
  entryComponents: [SimpleFlashMessagesComponent],
  providers: [FlashMessagesService]
})
export class FlashMessagesModule {}
