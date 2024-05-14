import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { LoginService } from '../../api/segurity/login/login.service';
import { UserService } from '../../api/user/user.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router, private securityLoginService: LoginService, private userService: UserService) { }

  protected form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  loading: boolean = false;
  
  public logCheck() {
    this.loading = true;
    let user = this.form.value;
    this.securityLoginService.logCheck(user).pipe(
      switchMap((res: any) => {
        if (typeof res.token === 'string') {
          window.localStorage.setItem('token', res.token);
          return this.userService.getUserbyEmail(user.username);
        } else {
          this.loading = false;
          return this.router.navigate(['security']);
        }
      })
    ).subscribe({
      next: (userResponse: any) => {
        window.localStorage.setItem('user', JSON.stringify(userResponse));
        if (userResponse.roles[0] !== 'ROLE_USER') {
          window.localStorage.setItem('permissions', 'true');
        }
        this.loading = false;
        this.router.navigate(['mini_games']);
      }, error: (error: any) => {
        console.error("Error:", error); // Maneja el error de getUserbyEmail
        this.loading = false;
      }
    });
  }

}