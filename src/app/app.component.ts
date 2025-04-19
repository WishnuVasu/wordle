import { Component } from '@angular/core';
import { slideInAnimation } from './route-animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'wordle-game';
  prepareRoute(outlet: RouterOutlet) {
    //return outlet?.activatedRouteData?.['animation'];
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
