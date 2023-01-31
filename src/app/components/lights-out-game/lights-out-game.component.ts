import { Component } from '@angular/core';
import { Router, RouterEvent, RouterLink } from '@angular/router';
import { LightsOutSwitch } from 'src/app/models/lights-out-switch.model';

@Component({
  selector: 'app-lights-out-game',
  templateUrl: './lights-out-game.component.html',
  styleUrls: ['./lights-out-game.component.scss']
})
export class LightsOutGameComponent {

  panel : LightsOutSwitch[] = [
    new LightsOutSwitch(1, 3, false),
    new LightsOutSwitch(2, 3, false),
    new LightsOutSwitch(3, 3, false),
    new LightsOutSwitch(1, 2, false),
    new LightsOutSwitch(2, 2, false),
    new LightsOutSwitch(3, 2, false),
    new LightsOutSwitch(1, 1, false),
    new LightsOutSwitch(2, 1, false),
    new LightsOutSwitch(3, 1, false)
  ]

  constructor(private router : Router){}

  ngOnInit(){
    this.shuffleLights();
  }

  shuffleLights(){
    this.panel.map(light => 
      Math.floor(Math.random()*2) === 1 ? light.activated = true : light.activated = false)
      this.resetIfAllIsTheSame();
  }

  checkIfAllTheSame() : number {
    const numberOfLights = this.panel.filter(light => light.activated === true)
    return numberOfLights.length;
  }

  resetIfAllIsTheSame(){
    if(this.checkIfAllTheSame() === (0 || 9)){
      this.shuffleLights();
      console.log("!");
    }
  }

  win(){
      this.router.navigateByUrl("/home")
  }

  switchLights(xFound : number, yFound : number) : void{
    
    let lightsToSwitch : LightsOutSwitch[] = 
    this.panel.filter(light => 
      light.x === xFound && light.y === yFound ||
      light.x === xFound && light.y === yFound+1 ||
      light.x === xFound && light.y === yFound-1 ||
      light.x === xFound+1 && light.y === yFound ||
      light.x === xFound-1 && light.y === yFound
      );

    lightsToSwitch.map(light => light.activated = !light.activated)

    if(this.checkIfAllTheSame() === 9){
      setTimeout(()=>
      this.win(), 500)
    }
  }
}
