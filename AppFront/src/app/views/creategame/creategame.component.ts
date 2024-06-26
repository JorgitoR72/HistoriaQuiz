import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { GamesService } from '../../api/games/games.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-creategame',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './creategame.component.html',
  styleUrl: './creategame.component.css'
})
export class CreategameComponent {
  user: any;
  formLoaded: boolean = false;
  gameTypes: any[] = [];
  levels: any[] = [];
  form: FormGroup;

  constructor(
    private router: Router,
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
        return this.router.navigate(['mini_games/list']);
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
}
