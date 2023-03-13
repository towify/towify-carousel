import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[towifyCarouselContent]'
})
export class TowifyCarouselContentDirective {

  constructor(public templateRef: TemplateRef<unknown>) { }

}
