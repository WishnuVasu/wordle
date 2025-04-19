import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { WordleInstructionsComponent } from './wordle-instructions/wordle-instructions.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HomeComponent,
    WordleInstructionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
