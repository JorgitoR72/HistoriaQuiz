import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { GamesService } from '../../api/games/games.service';

@Component({
  selector: 'app-creategame',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './creategame.component.html',
  styleUrl: './creategame.component.css'
})
export class CreategameComponent {
  constructor( private gamesService: GamesService ) {
    this.getUserData();
  }

  public user: any
  public formLoaded: boolean = false;

  public getUserData() {
    const userJSON: any = window.localStorage.getItem('user');
    this.user = JSON.parse(userJSON)
  }

  protected form: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    typegame: new FormControl('')
  });

  public createGame() {
    let game = this.form.value;
    game.user_id = this.user.id
    this.gamesService.createGame(game).subscribe({
      next: (res) => {
        console.log(res);
        alert('Juego creado correctamente 1');
      },
      error: (error) => {
        console.error(error);
        alert('Error al crear el juego');
      }
    });
  }

  public gameTypes: any[] = []
  public getGameTypes() {
    this.gamesService.getTypeGames().subscribe({
      next: (res) => {
        this.gameTypes = res;
        this.formLoaded = true;
        console.log('Juego creado correctamente 2');
      },
      error: (error) => {
        console.log(error);
        console.log('Error al crear el juego');
      }
    });
  }

  ngOnInit(): void {
    this.getGameTypes();
  }
}
