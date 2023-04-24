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
    new TicTacToeBox(1, 3, "none"),
    new TicTacToeBox(2, 3, "none"),
    new TicTacToeBox(3, 3, "none"),
    new TicTacToeBox(1, 2, "none"),
    new TicTacToeBox(2, 2, "none"),
    new TicTacToeBox(3, 2, "none"),
    new TicTacToeBox(1, 1, "none"),
    new TicTacToeBox(2, 1, "none"),
    new TicTacToeBox(3, 1, "none")
  ]

  constructor(public router: Router) { }

  selectABox(xPos: number, yPos: number): void {
    this.makeACircle(xPos, yPos);
    this.checkGameResult('player');
    this.checkIfExAequo();
  }

  makeACircle(xPos: number, yPos: number): void {
    const boxToToggle: TicTacToeBox[] = this.grid.filter(box =>
      box.x === xPos && box.y === yPos);
    if (boxToToggle[0].activated === 'none') {
      boxToToggle[0].activated = 'player';
    }
  }

  makeACross(box: TicTacToeBox): void {
    box.activated = 'npc';
  }

  checkfreeBoxes(): TicTacToeBox[] {
    let freeBoxes: TicTacToeBox[];
    return freeBoxes = this.grid.filter(box =>
      box.activated === 'none')
  }

  selectRandomlyABoxAmongFreeBoxes(): number {
    let randomBox = Math.floor(Math.random() * this.checkfreeBoxes().length);
    return randomBox;
  }

  checkGameResult(target : string) : void {
    this.straightWinCheck('x', target);
    this.straightWinCheck('y', target);
    this.diagonalWinCheck(target);
  }

  checkIfExAequo() : void {
    if(this.checkfreeBoxes().length === 0){
      this.exAequo();
    }
  }

  straightWinCheck(axe: string, target: string): void {
    let directionToCheck: TicTacToeBox[] = [];
    for (let i = 0; i < 3; i++) {
      if (axe === 'x') {
        directionToCheck = this.grid.filter(box =>
          box.x === i + 1);
      } else if (axe === 'y') {
        directionToCheck = this.grid.filter(box =>
          box.y === i + 1);
      }
      let tickedPerDirection = directionToCheck.filter(box =>
        box.activated === target);
      if (tickedPerDirection.length === 3) {
        if (target === 'player') {
          this.win();
        } else {
          this.lose();
        }
      }
    }
  }

  diagonalWinCheck(target: string): void {
    if (
      (this.grid[0].activated === target &&
        this.grid[4].activated === target &&
        this.grid[8].activated === target) ||
      (this.grid[2].activated === target &&
        this.grid[4].activated === target &&
        this.grid[6].activated === target)) {
      if (target === 'player') {
        this.win();
      } else {
        this.lose();
      }
    }
  }

  win() {
    console.log("gagné !");
  }

  lose() {
    console.log("perdu !");
  }

  exAequo() {
    console.log("ex aequo !");
  }

  NPCTurn() {

  }

  NPCPlaysRandom(): void {
    this.makeACross(this.checkfreeBoxes()[this.selectRandomlyABoxAmongFreeBoxes()])
    this.checkGameResult('npc');
    this.checkIfExAequo();
  }

}
