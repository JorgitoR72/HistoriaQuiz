import { Component } from '@angular/core';
import { GamesService } from '../../api/games/games.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LogoutService } from '../../api/segurity/logout/logout.service';

@Component({
  selector: 'app-listgame',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './listgame.component.html',
  styleUrl: './listgame.component.css'
})
export class ListgameComponent {
  constructor(private gamesService: GamesService, public logoutSecurityService: LogoutService) {}

  public logout() {
    this.logoutSecurityService.logOut();
  }

  public gameList: any[] = [];
  public pagedGameList: any[] = []; // Lista de juegos paginada
  public currentPage: number = 1; // Página actual
  public itemsPerPage: number = 2; // Número de elementos por página
  public totalPages: number = 0; // Número total de páginas
  public pages: number[] = []; // Array de números de página
  public formLoaded: boolean = false;

  public showGames() {
    this.gamesService.getAllGames().subscribe({
      next: (res) => {
        this.gameList = res;
        this.formLoaded = true;
        this.totalPages = Math.ceil(this.gameList.length / this.itemsPerPage);
        this.setPage(1);
        console.log('Juego creado correctamente 3');
      },
      error: (error) => {
        console.log(error);
        console.log('Error al crear el juego');
      }
    });
  }

  setPage(page: number) {
    this.currentPage = page;
    let startIndex = (page - 1) * this.itemsPerPage;
    let endIndex = Math.min(startIndex + this.itemsPerPage - 1, this.gameList.length - 1);
    this.pagedGameList = this.gameList.slice(startIndex, endIndex + 1);
    this.generatePageNumbers();
  }

  generatePageNumbers() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  ngOnInit(): void {
    this.showGames();
  }
}
