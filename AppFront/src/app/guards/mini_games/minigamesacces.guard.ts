import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable()

class MinigamesPermissions {

  constructor(private router: Router) { }

  canActivate(): any {
    const token = window.localStorage.getItem('token')
    if (token!) {
      return true
    } else {
      this.router.navigate(['security'])
      return false
    }
  }
}

export const minigamesaccesGuard: CanActivateFn = (route, state) => {
  const permissionsService = new MinigamesPermissions(new Router);
  return permissionsService.canActivate();
};
