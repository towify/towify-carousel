import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'staff';

  carousel = [{
    background: 'red'
  }, {
    background: 'black'
  }, {
    background: 'green'
  }, {
    background: 'gray'
  }]
}
