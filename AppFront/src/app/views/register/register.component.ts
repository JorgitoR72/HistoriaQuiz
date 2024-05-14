import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RegisterService } from '../../api/segurity/register/register.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private router: Router, private registerService: RegisterService) { }

  protected form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  loading: boolean = false;

  public logReg() {
    this.loading = true;
    let user = this.form.value;
    this.registerService.register(user).subscribe({
      next: (res: any) => {
        if (typeof res.token === 'string') {
          window.localStorage.setItem('token', res.token);
          window.localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['security']);
        } else {
          this.loading = false;
          this.router.navigate(['security']);
        }
      },
      error: (error: any) => {
        console.error("Error:", error);
        this.loading = false;
      }
    });
  }
}
