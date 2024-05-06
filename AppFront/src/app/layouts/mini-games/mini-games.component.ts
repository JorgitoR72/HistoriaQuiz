import { Component } from '@angular/core';
import { LogoutService } from '../../api/segurity/logout/logout.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GamesService } from '../../api/games/games.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-mini-games',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './mini-games.component.html',
  styleUrl: './mini-games.component.css'
})
export class MiniGamesComponent {
  constructor( public logoutSecurityService: LogoutService, private gamesService: GamesService ) {

  }

  public logout() {
    this.logoutSecurityService.logOut();
  }

  public gameList: any[] = []
  public formLoaded: boolean = false;

  public showGames() {
    this.gamesService.getAllGames().subscribe({
      next: (res) => {
        this.gameList = res;
        this.formLoaded = true;
        console.log('Juego creado correctamente 3');
      },
      error: (error) => {
        console.log(error);
        console.log('Error al crear el juego');
      }
    });
  }

  ngOnInit(): void {
    this.showGames();
  }
}
