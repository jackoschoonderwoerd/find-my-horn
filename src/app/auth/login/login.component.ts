import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../auth.service';
import { HornUser } from 'src/app/shared/models/user.model';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../app.reducer'
import { Observable, map } from 'rxjs';
import { UserCredential, sendPasswordResetEmail, } from '@angular/fire/auth';
import * as UI from './../../shared/ui.actions';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginErrorComponent } from './login-error/login-error.component';
import { NewPasswordRequestComponent } from './new-password-request/new-password-request.component';


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        LoginErrorComponent
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    isLoading$: Observable<boolean>

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private store: Store<fromRoot.State>,
        private router: Router,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.isLoading$ = this.store.select(fromRoot.getIsLoading)
        this.store.subscribe((data) => {
            //console.log(data)
        })
        this.initForm()
    }
    initForm() {
        this.form = this.fb.group({
            email: new FormControl('jackoboes@gmail.com', [Validators.required]),
            password: new FormControl('123456', [Validators.required])
        })
    }
    onLogin() {
        //console.log(this.form.value)
        const hornUser: HornUser = {
            name: this.form.value.name,
            email: this.form.value.email,
            password: this.form.value.password
        }
        this.authService.logIn(hornUser)
    }
    onLogInWithGoogle() {
        this.authService.GoogleAuth();
    }
    onRequestNewPassword() {
        const email = this.form.value.email
        const dialogRef = this.dialog.open(NewPasswordRequestComponent, {
            data: {
                email: email,
                message: 'a link for a new password will be sent to this email address'
            }
        })
        dialogRef.afterClosed().subscribe((res: any) => {
            if (res) {
                this.authService.requestNewPassword(email)
                    .then((res: any) => {

                        console.log('email sent', res);
                    })
                    .catch((err: any) => {
                        console.log('sending email failed', err);
                    });
            }
        })
    }

    logInAsJackoboesGmail() {
        const hornUser: HornUser = {
            name: 'jacko gmail',
            email: 'jackoboes@gmail.com',
            password: '123456'
        }
        this.authService.logIn(hornUser)
    }
    logInAsJackoSchoonderwoerdYahoo() {
        const hornUser: HornUser = {
            name: 'jackoschoonderwoerd@yahoo',
            email: 'jacko yahoo.nl',
            password: '123456'
        }
        this.authService.logIn(hornUser)
    }
}
