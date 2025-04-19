import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  gameTitle: string[] =["W","O","R","D","L","E"] ;
  constructor(private router: Router) {}

  startGame($event?:any) {
    this.router.navigate(['/game']);
    console.log("GAME STARTED");
  }

  goToInstructions($event?:any){
    this.router.navigate(['/instructions'])
  }
}
