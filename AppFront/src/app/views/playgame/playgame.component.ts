import { Component } from '@angular/core';
import { GamesService } from '../../api/games/games.service';
import { Observable } from 'rxjs';
import { Answer, Game, Question } from '../../interfaces/game.model';
import { environment } from '../../../environments/environment';
import { PyramidPart } from '../../interfaces/pyramidpart';
import { NgFor, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-playgame',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle],
  templateUrl: './playgame.component.html',
  styleUrl: './playgame.component.css'
})
export class PlaygameComponent {

  game!: Game; // Juego actual
  questions: Question[] = []; // Preguntas disponibles
  failedQuestions: Question[] = []; // Preguntas falladas
  currentQuestionIndex: number = 0; // Índice de la pregunta actual
  attempts: number = 3; // Intentos restantes
  score: number = 0; // Puntaje actual
  selectedAnswer: Answer | null = null; // Respuesta seleccionada
  isGameOver: boolean = false; // Indicador de si el juego ha terminado
  resultMessage: string = ''; // Mensaje de resultado final
  pyramidParts: PyramidPart[] = [];

  constructor( private gamesService: GamesService ) {
    this.initializePyramid(3, 60, 50);
  }

  // Cargar el juego desde la API
  loadGame(gameId: number) {
    this.gamesService.getPlayGame(gameId).subscribe(game => {
      this.game = game;
      this.questions = this.shuffleArray([...game.questions]);
      this.loadQuestion();
    });
  }

  // Cargar el juego desde la API
  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Cargar una nueva pregunta
  loadQuestion() {
    if (this.questions.length > 0) {
      this.currentQuestionIndex = Math.floor(Math.random() * this.questions.length);
    } else if (this.failedQuestions.length > 0) {
      this.questions = this.shuffleArray([...this.failedQuestions]);
      this.failedQuestions = [];
      this.currentQuestionIndex = Math.floor(Math.random() * this.questions.length);
    }
  }

  // Procesar la respuesta seleccionada
  answerQuestion() {
    if (!this.game) return;
    if (this.selectedAnswer?.correct) {
      this.showPart();
      this.score++;
      this.questions.splice(this.currentQuestionIndex, 1); // Eliminar la pregunta respondida correctamente
      if (this.questions.length === 0) { // Verificar si no quedan preguntas por responder
        this.endGame(true); // Terminar el juego con victoria
        return;
      }
    } else {
      if (this.score > 0) {
        this.hidePart();
        this.score--;
      }
      this.attempts--;
      if (this.attempts === 0) {
        this.endGame(false); // Terminar el juego si se agotan los intentos
        return;
      }
      // Mover la pregunta actual al array de preguntas falladas
      const failedQuestion = this.questions.splice(this.currentQuestionIndex, 1)[0];
      this.failedQuestions.push(failedQuestion);
    }
  
    // Verificar si se han contestado todas las preguntas
    if (this.questions.length === 0 && this.failedQuestions.length === 0) {
      this.endGame(this.score === this.game.questions.length);
    } else {
      this.loadQuestion();
      this.selectedAnswer = null;
    }
  }
  
  // Método para terminar el juego y mostrar el mensaje final
  endGame(won: boolean) {
    this.isGameOver = true;
    this.resultMessage = won ? '¡Ganaste!' : '¡Perdiste!';
  }

  // Reiniciar el juego
  resetGame() {
    this.loadGame(this.game.id); // Recargar el juego
    this.attempts = 3;
    this.score = 0;
    this.selectedAnswer = null;
    this.isGameOver = false;
    this.resultMessage = '';
  }

  initializePyramid(numParts: number, width = 100, height = 100): void {
    this.pyramidParts = [];
    for (let i = 1; i <= numParts; i++) {
      this.pyramidParts.push({
        style: {
          width: `${i * width}px`,
          height: `${height}px`
        },
        isVisible: false
      });
    }
  }

  showPart(): void {
    const hiddenPart = this.pyramidParts.find(part => !part.isVisible);
    if (hiddenPart) {
      hiddenPart.isVisible = true;
      console.log(hiddenPart);
    }
  }

  hidePart(): void {
    const visiblePart = this.pyramidParts.find(part => part.isVisible);
    if (visiblePart) {
      visiblePart.isVisible = false;
      console.log(visiblePart);
    }
  }

  ngOnInit(): void {
    this.gamesService.datoCompartido$.subscribe(idGame => {
      this.loadGame(idGame);
    });
  }
}