import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LightsOutGameComponent } from './components/lights-out-game/lights-out-game.component';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  {path : "home", component : MenuComponent},
  {path : "lights-out", component : LightsOutGameComponent},
  {path : "**", component : MenuComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
