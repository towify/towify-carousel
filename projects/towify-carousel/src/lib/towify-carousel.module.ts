/*
 * @Author: allen
 * @Date: 2023/3/13
*/

import { NgModule } from '@angular/core';
import { TowifyCarouselComponent } from './towify-carousel.component';
import { TowifyCarouselContentDirective } from './towify-carousel-content.directive';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TowifyCarouselItemStylePipe } from './towify-carousel-item-style.pipe';

@NgModule({
  declarations: [TowifyCarouselComponent, TowifyCarouselContentDirective, TowifyCarouselItemStylePipe],
  imports: [
    BrowserModule,
    CommonModule,
    DragDropModule
  ],
  exports: [TowifyCarouselComponent, TowifyCarouselContentDirective]
})
export class TowifyCarouselModule { }
