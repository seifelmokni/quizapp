import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@app/shared/navbar/navbar.component';

@NgModule({
  imports: [CommonModule],
  exports: [NavbarComponent],
  declarations: [NavbarComponent]
})
export class NavbarModule {}
