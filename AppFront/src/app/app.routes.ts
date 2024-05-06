import { Routes } from '@angular/router';
import { SecurityComponent } from './layouts/security/security.component';
import { minigamesaccesGuard } from './guards/mini_games/minigamesacces.guard';
import { securityguardGuard } from './guards/security/securityguard.guard';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { MiniGamesComponent } from './layouts/mini-games/mini-games.component';
import { CreategameComponent } from './views/creategame/creategame.component';

export const routes: Routes = [
  { 
    path: '', redirectTo: 'security', pathMatch: 'full' 
  },
  {
    path: 'mini_games', component: MiniGamesComponent,
    canActivate: [minigamesaccesGuard],
    children: [
      {
        path: '', redirectTo: '', pathMatch: 'full',
      },
      {
        path: 'create',
        component: CreategameComponent
      },
      {
        path: 'update',
        component: LoginComponent
      },
      {
        path: 'list',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'security', component: SecurityComponent,
    canActivate: [securityguardGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: '', redirectTo: 'login', pathMatch: 'full',
      }
    ]
  }
];
