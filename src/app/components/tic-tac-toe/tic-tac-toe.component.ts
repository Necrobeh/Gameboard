import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TicTacToeBox } from 'src/app/models/tic-tac-toe-box.model';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent {

  customGridSize: number = 5;

  customGrid: TicTacToeBox[] = [];

  possibleDirections: TicTacToeBox[][] = [];

  constructor(public router: Router) { }

  ngOnInit() {
    this.applyCustomGrid();
    this.applyPossibleStraightDirections();
    this.applyPossibleDiagonalDirections();
  }

  applyCustomGrid() {
    for (let i = 0; i < this.customGridSize; i++) {
      for (let j = 0; j < this.customGridSize; j++) {
        this.customGrid.push(new TicTacToeBox(i + 1, j + 1, "none"))
      }
    }
  }

  applyPossibleStraightDirections() {
    for (let i = 0; i < this.customGridSize; i++) {

      const xAxis: TicTacToeBox[] =
        this.customGrid.filter(box => box.x === i + 1);

      const yAxis: TicTacToeBox[] =
        this.customGrid.filter(box => box.y === i + 1);

      this.possibleDirections.push(xAxis);
      this.possibleDirections.push(yAxis);
    }
  }

  applyPossibleDiagonalDirections() {
    const diag1: TicTacToeBox[] = [];
    const diag2: TicTacToeBox[] = [];

    for (let a = 0; a < this.customGridSize; a++) {
      const boxToPush: TicTacToeBox | undefined =
        this.customGrid.find(box => box.x === a + 1 && box.y === a + 1)
      if (boxToPush !== undefined) {
        diag1.push(boxToPush)
      }
    }

    for (let b = 0; b < this.customGridSize; b++) {
      const boxToPush: TicTacToeBox | undefined =
        this.customGrid.find(box => box.x === b + 1 && box.y === this.customGridSize - b)
      if (boxToPush !== undefined) {
        diag2.push(boxToPush)
      }
    }
    this.possibleDirections.push(diag1);
    this.possibleDirections.push(diag2);
  }

  selectABox(xPos: number, yPos: number): void {
    this.makeACircle(xPos, yPos);
    this.winCheck();
  }

  makeACircle(xPos: number, yPos: number): void {
    const boxToToggle: TicTacToeBox[] = this.customGrid.filter(box =>
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
    return freeBoxes = this.customGrid.filter(box =>
      box.activated === 'none')
  }

  selectRandomlyABoxAmongFreeBoxes(): number {
    let randomBox = Math.floor(Math.random() * this.checkfreeBoxes().length);
    return randomBox;
  }

  winCheck() {
    const decisivePlay : TicTacToeBox[][] =
      this.possibleDirections.filter(axis => {
        return axis[0].activated !== 'none' &&
         axis[1].activated !== 'none' &&
         axis[2].activated !== 'none' &&
         (axis[0].activated === axis[1].activated && axis[0].activated === axis[2].activated)
      })
      if(decisivePlay.length !== 0){
        decisivePlay[0][0].activated === 'player' ? this.win() : this.lose();    
      }else if(this.checkfreeBoxes().length === 0){
        this.exAequo();
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
    this.winCheck();
  }

}
