import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LightsOutGameComponent } from './components/lights-out-game/lights-out-game.component';
import { MenuComponent } from './components/menu/menu.component';
import { PuzzleComponent } from './components/puzzle/puzzle.component';

const routes: Routes = [
  {path : "home", component : MenuComponent},
  {path : "lights-out", component : LightsOutGameComponent},
  {path : "puzzle", component : PuzzleComponent},
  {path : "**", component : MenuComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
