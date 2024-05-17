import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { GamesService } from '../../api/games/games.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PyramidPart } from '../../interfaces/pyramidpart';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-creategame',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive, NgStyle],
  templateUrl: './creategame.component.html',
  styleUrl: './creategame.component.css'
})
export class CreategameComponent {
  user: any;
  formLoaded: boolean = false;
  gameTypes: any[] = [];
  levels: any[] = [];
  form: FormGroup;
  pyramidParts: PyramidPart[] = []

  constructor(
    private gamesService: GamesService,
    private formBuilder: FormBuilder
  ) {
    this.getUserData();
    this.form = this.formBuilder.group({
      title: [''],
      description: [''],
      typegame: [''],
      questions: this.formBuilder.array([])
    });
    this.initializePyramid(20, 25, 25);
  }

  ngOnInit(): void {
    this.getGameTypes();
    this.getLevels();
  }

  getUserData() {
    const userJSON: any = window.localStorage.getItem('user');
    this.user = JSON.parse(userJSON)
  }

  getGameTypes() {
    this.gamesService.getTypeGames().subscribe({
      next: (res) => {
        this.gameTypes = res;
        this.formLoaded = true;
      },
      error: (error) => {
        console.error(error);
        alert('Error al obtener los tipos de juego');
      }
    });
  }

  getLevels() {
    this.gamesService.getLevels().subscribe({
      next: (res) => {
        this.levels = res;
      },
      error: (error) => {
        console.error(error);
        alert('Error al obtener los tipos de juego');
      }
    });
  }

  createGame() {
    let game = this.form.value;
    game.user_id = this.user.id;
    this.gamesService.createGame(game).subscribe({
      next: (res) => {
        console.log(res);
        alert('Juego creado correctamente');
      },
      error: (error) => {
        console.error(error);
        alert('Error al crear el juego');
      }
    });
  }

  addQuestion() {
    const questionGroup = this.formBuilder.group({
      content: [''],
      level: [''],
      answers: this.formBuilder.array([
        this.createAnswer(),
        this.createAnswer(),
        this.createAnswer(),
        this.createAnswer()
      ])
    });

    this.questions.push(questionGroup);
  }

  createAnswer() {
    return this.formBuilder.group({
      content: [''],
      correct: [false]
    });
  }

  deleteQuestion(index: number) {
    this.questions.removeAt(index);
  }

  get questions() {
    return this.form.get('questions') as FormArray;
  }

  getAnswers(questionIndex: number) {
    return (this.questions.controls[questionIndex] as FormGroup).get('answers') as FormArray;
  }

  getAnswerLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  levelDescription: string = '';
  getLevelDescription(event: any) {
    const levelId = event.target.value;
    const level = this.levels.find(level => level.id === levelId);
    this.levelDescription = level ? level.description : '';
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
}
