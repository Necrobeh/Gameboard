import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TicTacToeBox } from 'src/app/models/tic-tac-toe-box.model';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent {

  customGridSize: number = 3;

  customGrid: TicTacToeBox[] = [];

  possibleDirections: TicTacToeBox[][] = [];

  winStatus: string = 'none'

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
    this.isThereFreeBoxes();
    if (this.winStatus === 'none') {
      this.makeACircle(xPos, yPos);
      this.NPCPlays();
      console.log(this.winStatus);
    }
  }

  makeACircle(xPos: number, yPos: number): void {
    const boxToToggle: TicTacToeBox[] = this.customGrid.filter(box =>
      box.x === xPos && box.y === yPos);
    if (boxToToggle[0].activated === 'none') {
      boxToToggle[0].activated = 'player';
    }
    this.winCheck();
  }

  makeACross(box: TicTacToeBox): void {
    box.activated = 'npc';
  }

  isThereFreeBoxes() {
    let isThereFreeboxes: TicTacToeBox[] = (this.customGrid.filter(box => {
      return box.activated === 'none'
    }))

    if (isThereFreeboxes.length === 0) {
      this.winStatus = 'ex aequo'
    }
  }

  checkfreeBoxes(scope: TicTacToeBox[]): TicTacToeBox[] {
    return scope.filter(box =>
      box.activated === 'none')
  }

  selectRandomlyABoxAmongFreeBoxes(): number {
    let randomBox = Math.floor(Math.random() * this.checkfreeBoxes(this.customGrid).length);
    return randomBox;
  }

  winCheck() {
    const decisivePlay: TicTacToeBox[][] = [];
    for (let i = 0; i < this.possibleDirections.length; i++) {
      if (this.isSameValues(this.possibleDirections[i])) {
        decisivePlay.push(this.possibleDirections[i])
      }
    }
    if (decisivePlay.length !== 0) {
      decisivePlay[0][0].activated === 'player' ? this.win() : this.lose();
    } else if (this.checkfreeBoxes(this.customGrid).length === 0) {
      this.exAequo();
    }
  }

  isSameValues(array: TicTacToeBox[]): boolean {
    return array.every(value => {
      return value.activated === array[0].activated &&
        value.activated !== 'none'
    })
  }

  win() {
    this.winStatus = 'player'
  }

  lose() {
    this.winStatus = 'npc'
  }

  exAequo() {
    this.winStatus = 'ex aequo'
  }

  NPCTurn() {

  }

  NPCPlaysRandom(): void {
    this.makeACross(this.checkfreeBoxes(this.customGrid)[this.selectRandomlyABoxAmongFreeBoxes()]);
    this.winCheck();
  }

  NPCPlays(): void {
    this.isThereFreeBoxes();
    if (this.winStatus === 'none') {
      if (this.findOpportunities('npc') !== 0 && this.winStatus === 'none') {
        this.makeACross(this.checkfreeBoxes(this.possibleDirections[this.findOpportunities('npc')])[0]);
      }else if(this.findOpportunities('player') !== -1) {
        this.makeACross(this.checkfreeBoxes(this.possibleDirections[this.findOpportunities('player')])[0]);
      }else{
        this.NPCPlaysRandom();
      }
      this.winCheck();
    }
  }

  findOpportunities(target: string): number {
    let lineToFocus: number = 0;
    let bestOpportunities: TicTacToeBox[] = [];
    for (let i = 0; i < this.possibleDirections.length; i++) {
      let opportunity: TicTacToeBox[] = this.possibleDirections[i].filter(box => {
        return box.activated === target;
      })
      let obstruction: TicTacToeBox[] = this.possibleDirections[i].filter(box => {
        return box.activated !== target && box.activated !== 'none';
      })
      if (opportunity.length > bestOpportunities.length && obstruction.length === 0) {
        bestOpportunities = opportunity
        lineToFocus = i;
      };
    }
    if (target === 'npc') {
      return lineToFocus;
    } else if (target === 'player' && bestOpportunities.length === this.customGridSize - 1) {
      return lineToFocus;
    } else {
      return -1;
    }
  }

}
