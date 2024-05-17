import { Component } from '@angular/core';
import { LogoutService } from '../../api/segurity/logout/logout.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-mini-games',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './mini-games.component.html',
  styleUrl: './mini-games.component.css'
})
export class MiniGamesComponent {

}
