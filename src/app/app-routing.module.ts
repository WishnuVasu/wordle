import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { WordleInstructionsComponent } from './wordle-instructions/wordle-instructions.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'HomePage' } },
  { path: 'game', component: GameComponent, data: { animation: 'GamePage' } },
  { path: 'instructions', component: WordleInstructionsComponent, data: { animation: 'GamePage' } },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
