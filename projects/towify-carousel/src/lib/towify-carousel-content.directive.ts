/*
 * @Author: allen
 * @Date: 2023/3/13
*/

import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[towifyCarouselContent]'
})
export class TowifyCarouselContentDirective {

  constructor(public templateRef: TemplateRef<unknown>) { }

}
