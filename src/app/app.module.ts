import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { LightsOutGameComponent } from './components/lights-out-game/lights-out-game.component';
import { PuzzleComponent } from './components/puzzle/puzzle.component';
import { TicTacToeComponent } from './components/tic-tac-toe/tic-tac-toe.component';
import { WinWindowComponent } from './components/win-window/win-window.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LightsOutGameComponent,
    PuzzleComponent,
    TicTacToeComponent,
    WinWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
