import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingBgComponent } from './floating-bg/floating-bg.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FloatingBgComponent
  ],
  exports: [
    FloatingBgComponent
  ]
})
export class FloatingBgModule { }
