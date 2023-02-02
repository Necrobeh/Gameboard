import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PuzzlePiece } from 'src/app/models/puzzle-piece.model';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss']
})
export class PuzzleComponent {

  puzzle: PuzzlePiece[] = [
    new PuzzlePiece(true, 1, 3, 1),
    new PuzzlePiece(true, 2, 3, 2),
    new PuzzlePiece(true, 3, 3, 3),
    new PuzzlePiece(true, 1, 2, 4),
    new PuzzlePiece(true, 2, 2, 5),
    new PuzzlePiece(true, 3, 2, 6),
    new PuzzlePiece(true, 1, 1, 7),
    new PuzzlePiece(true, 2, 1, 8),
    new PuzzlePiece(false, 3, 1, 9)
  ]

  selectedPiece: PuzzlePiece = new PuzzlePiece(false, 0, 0, 0);

  constructor(public router: Router) { }

  ngOnInit() {
    this.shufflePieces();
  }

  shufflePieces() {
    let numbersToDispatch: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < this.puzzle.length; i++) {
      let nextNumber: number = numbersToDispatch[Math.floor(Math.random() * (9 - i))];
      let indexToSplice: number = numbersToDispatch.indexOf(nextNumber);
      numbersToDispatch.splice(indexToSplice, 1);
      this.puzzle[i].order = nextNumber;
    }
  }

  clickOnPiece(x: number, y: number) {
    this.detectVoidPiece(x, y);
    this.movePiece(this.selectedPiece, this.detectVoidPiece(x, y));
    this.checkIfWin();
  }

  detectVoidPiece(x: number, y: number): PuzzlePiece | void {
    let checkSelectedPiece = this.puzzle.filter(piece => piece.xPos === x && piece.yPos === y);
    this.selectedPiece = checkSelectedPiece[0];

    let topPiece: PuzzlePiece[] = this.puzzle.filter(piece => piece.xPos === x && piece.yPos === y + 1);
    let rightPiece: PuzzlePiece[] = this.puzzle.filter(piece => piece.xPos === x + 1 && piece.yPos === y);
    let bottomPiece: PuzzlePiece[] = this.puzzle.filter(piece => piece.xPos === x && piece.yPos === y - 1);
    let leftPiece: PuzzlePiece[] = this.puzzle.filter(piece => piece.xPos === x - 1 && piece.yPos === y);

    let sidePieces: PuzzlePiece[] = [topPiece[0], rightPiece[0], bottomPiece[0], leftPiece[0]];

    let pieceToMove: PuzzlePiece = new PuzzlePiece(false, 0, 0, 0);

    for (let i = 0; i < sidePieces.length; i++) {
      if (sidePieces[i] !== undefined) {
        if (sidePieces[i].isPiece === false) {
          pieceToMove = sidePieces[i];
        }
      }
    }
    if (pieceToMove.order !== 0) {
      return pieceToMove;
    }
  }

  movePiece(selectedPiece: PuzzlePiece, otherPiece: PuzzlePiece | void): void {
    if (otherPiece !== undefined) {
      selectedPiece.isPiece = false;
      otherPiece.isPiece = true;
      let savedSelectedPos = selectedPiece.order;
      let savedOtherPos = otherPiece.order;
      selectedPiece.order = savedOtherPos;
      otherPiece.order = savedSelectedPos;
    }
  }

  checkIfWin() {
    let count: number = 0;
    for (let i = 0; i < this.puzzle.length; i++) {
      if (this.puzzle[i].order === i + 1) {
        count += 1;
      }
    }
    if (count === 9) {
      setTimeout(() =>
        this.router.navigateByUrl("/home"), 500)
    }
  }
}
