/*
 * @Author: allen
 * @Date: 2023/3/13
*/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'towifyCarouselItemStyle'
})
export class TowifyCarouselItemStylePipe implements PipeTransform {

  transform(currentIndex: number, itemIndex: number, itemCount: number, type: 'slide' | 'fade'): unknown {
    if (type === 'fade') {
      return {
        opacity: currentIndex === itemIndex ? '1' : '0',
        pointerEvents: currentIndex === itemIndex ? '' : 'none',
      }
    } else {

    }
    return null;
  }

}
