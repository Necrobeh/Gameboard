import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TicTacToeBox } from 'src/app/models/tic-tac-toe-box.model';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent {

  grid: TicTacToeBox[] = [
    new TicTacToeBox(1, 3, false, false),
    new TicTacToeBox(2, 3, false, false),
    new TicTacToeBox(3, 3, false, false),
    new TicTacToeBox(1, 2, false, false),
    new TicTacToeBox(2, 2, false, false),
    new TicTacToeBox(3, 2, false, false),
    new TicTacToeBox(1, 1, false, false),
    new TicTacToeBox(2, 1, false, false),
    new TicTacToeBox(3, 1, false, false)
  ]

  constructor(public router: Router) { }

  selectABox(xPos: number, yPos: number): void {
    this.makeACircle(xPos, yPos);
    this.checkIfWin();
  }

  makeACircle(xPos: number, yPos: number): void {
    const boxToToggle: TicTacToeBox[] = this.grid.filter(box =>
      box.x === xPos && box.y === yPos);
    if (boxToToggle[0].activatedByNPC === false && boxToToggle[0].activatedByPlayer === false) {
      boxToToggle[0].activatedByPlayer = true;
    }
  }

  makeACross(box: TicTacToeBox): void {
    box.activatedByNPC = true;
    console.log(box.activatedByNPC);

  }

  checkfreeBoxes(): TicTacToeBox[] {
    let freeBoxes: TicTacToeBox[];
    return freeBoxes = this.grid.filter(box =>
      box.activatedByNPC === false && box.activatedByPlayer === false)
  }

  selectRandomlyABoxAmongFreeBoxes(): number {
    let randomBox = Math.floor(Math.random() * this.checkfreeBoxes().length);
    return randomBox;
  }

  checkIfWin(): void {
    this.straightWinCheck('x');
    this.straightWinCheck('y');
    this.diagonalWinCheck();
  }

  straightWinCheck(axe: string) : void {
    let direction: number[] = [0, 0, 0];
    let directionToCheck : TicTacToeBox[] = [];
    for (let i = 0; i < direction.length; i++) {
      if (axe === 'x') {
        directionToCheck = this.grid.filter(box =>
          box.x === i + 1);
      } else if(axe === 'y') {
        directionToCheck = this.grid.filter(box =>
          box.y === i + 1);
      }
      let roundPerDirection = directionToCheck.filter(box =>
        box.activatedByPlayer === true);
      if (roundPerDirection.length === 3) {
        this.win();
      }
    }
  }

  diagonalWinCheck() : void {
    if(
      (this.grid[0].activatedByPlayer && 
      this.grid[4].activatedByPlayer && 
      this.grid[8].activatedByPlayer) ||
      (this.grid[2].activatedByPlayer && 
      this.grid[4].activatedByPlayer && 
      this.grid[6].activatedByPlayer)){
        this.win();
      }
  }

  win() {
    this.router.navigateByUrl('/home')
  }

  lose() {
  }

  exAequo(){
    
  }

  NPCTurn() {

  }

  NPCPlaysRandom(): void {
    this.makeACross(this.checkfreeBoxes()[this.selectRandomlyABoxAmongFreeBoxes()])
    console.log(this.checkfreeBoxes()[this.selectRandomlyABoxAmongFreeBoxes()]);
  }

}
