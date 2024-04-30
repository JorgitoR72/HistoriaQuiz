import { Component } from '@angular/core';
import { LogoutService } from '../../api/segurity/logout/logout.service';

@Component({
  selector: 'app-mini-games',
  standalone: true,
  imports: [],
  templateUrl: './mini-games.component.html',
  styleUrl: './mini-games.component.css'
})
export class MiniGamesComponent {
  constructor(public logoutSecurityService: LogoutService) { }

  public logout() {
    this.logoutSecurityService.logOut();
  }
}
