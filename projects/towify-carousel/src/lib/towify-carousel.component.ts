/*
 * @Author: allen
 * @Date: 2023/3/13
*/

import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { TowifyCarouselContentDirective } from './towify-carousel-content.directive';
import { CarouselType } from './towify-carousel.type';

@Component({
  selector: 'towify-carousel',
  templateUrl: './towify-carousel.component.html',
  styleUrls: ['./towify-carousel.component.scss']
})
export class TowifyCarouselComponent implements OnInit {

  @ContentChild(TowifyCarouselContentDirective)
  content?: TowifyCarouselContentDirective;

  @ViewChild('carouselContainer', { read: ElementRef, static: true })
  carouselContainer!: ElementRef;

  @Input()
  data: any[] = [];

  @Input()
  config: CarouselType = {
    delay: 4,
    interval: 1,
    count: 3,
    type: 'slide'
  }

  @Output()
  indexChanged: EventEmitter<number> = new EventEmitter<number>();

  #delayTimeOut?: number;
  #prepareIndex;
  #startX;
  #containerRect: {
    x: number;
    y: number;
    width: number;
    height: number;
  };


  viewTranslateX = 0;
  viewOpacity = 0;
  viewTransition?: string;
  currentIndex = 0;

  computeDragRenderPos = () => {
    return { x: this.#containerRect.x, y: this.#containerRect.y };
  };

  constructor() {
    this.#prepareIndex = 0;
    this.#startX = -1;
    this.#containerRect = {
      x: 0,
      y: 0,
      width: 1,
      height: 1
    };
  }

  ngOnInit() {
    if (!this.data.length) {
      let index = 0;
      for (index; index < this.config.count; index += 1) {
        this.data.push({});
      }
    }
    this.autoPlayAnimation();
  }

  autoPlayAnimation() {
    if (this.#delayTimeOut) return;
    this.#delayTimeOut = window.setTimeout(() => {
      this.#prepareIndex = this.currentIndex + 1;
      this.viewTranslateX = 0 - (this.carouselContainer.nativeElement as HTMLElement).clientWidth;
      if (this.config.type === 'fade') {
        this.viewOpacity = 1;
      }
      this.viewTransition = `all ${this.config.interval}s`;
      this.#delayTimeOut = undefined;
    }, this.config.delay === 0 ? 100 : this.config.delay * 1000)
  }


  dragStart(data: CdkDragStart) {
    if (data.event.type === 'mousemove') {
      this.#startX = (<MouseEvent>data.event).clientX;
    } else if ((<TouchEvent>data.event).touches.length === 1) {
      this.#startX = (<TouchEvent>data.event).touches[0].clientX;
    }
    const swiperContainerRect = (
      this.carouselContainer.nativeElement as HTMLElement
    ).getBoundingClientRect();
    this.#containerRect = {
      x: swiperContainerRect.x,
      y: swiperContainerRect.y,
      width: swiperContainerRect.width,
      height: swiperContainerRect.height
    };
    this.viewTransition = undefined;
    this.viewTranslateX = 0;
    this.viewOpacity = 0;
    this.#prepareIndex = 0;
    if (this.#delayTimeOut) {
      window.clearTimeout(this.#delayTimeOut);
      this.#delayTimeOut = undefined;
    }
  }

  dragMove(data: CdkDragMove) {
    let moveX = -1
    if (data.event.type === 'mousemove') {
      moveX = (<MouseEvent>data.event).clientX;
    } else if ((<TouchEvent>data.event).touches.length === 1) {
      moveX = (<TouchEvent>data.event).touches[0].clientX;
    }
    if (this.#startX === -1 || moveX === -1) {
      return;
    }
    if (Math.abs(moveX - this.#startX) > this.#containerRect.width) {
      return;
    }
    this.viewTranslateX = moveX - this.#startX;
    if (this.config.type === 'fade') {
      this.viewOpacity = Math.abs(moveX - this.#startX) / this.#containerRect.width
    }
  }

  dragEnd() {
    if (Math.abs(this.viewTranslateX) > 5) {
      if (this.viewTranslateX > 0) {
        this.#prepareIndex = this.currentIndex - 1;
        this.viewTranslateX = this.#containerRect.width ;
        if (this.config.type === 'fade') {
          this.viewOpacity = 1;
        }
      } else {
        this.#prepareIndex = this.currentIndex + 1;
        this.viewTranslateX = 0 - this.#containerRect.width;
        if (this.config.type === 'fade') {
          this.viewOpacity = 1;
        }
      }
      this.viewTransition = 'all 0.5s';
    } else {
      this.viewTranslateX = 0;
      this.#prepareIndex = this.currentIndex;
      this.viewTransition = undefined;
      this.autoPlayAnimation();
    }
    this.#startX = -1;
  }

  transitionEnd() {
    this.currentIndex = this.#prepareIndex;
    if (this.currentIndex < 0) {
      this.currentIndex = this.data.length - 1;
    } else if (this.currentIndex > this.data.length - 1) {
      this.currentIndex = 0;
    }
    this.viewTransition = undefined;
    this.viewTranslateX = 0;
    this.viewOpacity = 0;
    this.indexChanged.emit(this.currentIndex);
    this.autoPlayAnimation();
  }

}
