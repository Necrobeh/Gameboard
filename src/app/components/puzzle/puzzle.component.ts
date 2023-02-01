import { Component } from '@angular/core';
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

  detectVoidPiece(x: number, y: number): void {
    let selectedPiece = this.puzzle.filter(piece => piece.xPos === x && piece.yPos === y);

    let sidePieces : PuzzlePiece[] = [];

    let topPiece: PuzzlePiece[] = this.puzzle.filter(piece => piece.xPos === x && piece.yPos === y + 1);
    let rightPiece: PuzzlePiece[] = this.puzzle.filter(piece => piece.xPos === x + 1 && piece.yPos === y);
    let bottomPiece: PuzzlePiece[] = this.puzzle.filter(piece => piece.xPos === x && piece.yPos === y - 1);
    let leftPiece: PuzzlePiece[] = this.puzzle.filter(piece => piece.xPos === x - 1 && piece.yPos === y);

    sidePieces.push(topPiece[0], rightPiece[0], bottomPiece[0], leftPiece[0]);

    for(let i = 0; i < sidePieces.length; i++){
      if (sidePieces[i] !== undefined) {
        if (sidePieces[i].isPiece === false) {
          this.movePiece(selectedPiece[0], sidePieces[i]);
        }
      }
    }
  }

  movePiece(selectedPiece: PuzzlePiece, otherPiece: PuzzlePiece) {
    selectedPiece.isPiece = false;
    otherPiece.isPiece = true;
    let savedSelectedPos = selectedPiece.order;
    let savedOtherPos = otherPiece.order;
    selectedPiece.order = savedOtherPos;
    otherPiece.order = savedSelectedPos;
  }

  checkIfWin(){
    
  }
}
