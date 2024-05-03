import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient, private router: Router) { }

  getAllGames(): Observable<any> {
    return this.http.get<any>(environment.url + 'api/games');
  }

  getTypeGames(): Observable<any> {
    return this.http.get<any>(environment.url + 'api/games/typegame');
  }

  getGameById(id: number): Observable<any> {
    return this.http.get<any>(environment.url + 'api/games/' + id);
  }

  createGame(game: any): Observable<any> {
    return this.http.post<any>(environment.url + 'api/games/new', game);
  }

  updateGame(id: number, game: any): Observable<any> {
    return this.http.put<any>(environment.url + 'api/games/edit/' + id, game);
  }

  deleteGame(id: number): Observable<any> {
    return this.http.delete(environment.url + 'api/games/delete/' + id);
  }
}
