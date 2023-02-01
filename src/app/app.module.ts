import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { LightsOutGameComponent } from './components/lights-out-game/lights-out-game.component';
import { PuzzleComponent } from './components/puzzle/puzzle.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LightsOutGameComponent,
    PuzzleComponent
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
