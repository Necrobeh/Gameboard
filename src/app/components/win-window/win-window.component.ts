import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-win-window',
  templateUrl: './win-window.component.html',
  styleUrls: ['./win-window.component.scss']
})
export class WinWindowComponent {

  @Input() winStatus : string = '';

  constructor(public router : Router){}

  goToHome() : void {
    this.router.navigateByUrl("/home");
  }

  reload() : void {
    location.reload();
  }

}
