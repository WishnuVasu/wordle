import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wordle-instructions',
  templateUrl: './wordle-instructions.component.html',
  styleUrls: ['./wordle-instructions.component.scss']
})
export class WordleInstructionsComponent {
 constructor(private router: Router){}

 goBack(){
  this.router.navigate(['/'])
 }
}
