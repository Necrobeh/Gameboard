import { Component } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  menuList : Menu[] = [];

  constructor(public dataS : DataService){}

  ngOnInit(){
    this.getData();
  }

  getData() : void{
    this.dataS.getData().subscribe(data => {
      
      this.menuList = data;
      console.log(this.menuList);
    })
  }
}
