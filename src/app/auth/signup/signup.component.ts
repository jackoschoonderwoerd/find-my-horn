import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HornUser } from 'src/app/shared/models/user.model';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../app.reducer'
import { Observable, map } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatProgressSpinnerModule],
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    form: FormGroup;
    isLoading$: Observable<boolean>
    constructor(
        private fb: FormBuilder,
        public authService: AuthService,
        private store: Store<{ ui: fromRoot.State }>
    ) { }
    ngOnInit(): void {

        this.initForm()
        this.isLoading$ = this.store.select(fromRoot.getIsLoading)
    }
    initForm() {
        this.form = this.fb.group({
            userName: new FormControl('jacko', [Validators.required]),
            email: new FormControl('jackoboes@gmail.com', [Validators.required]),
            password: new FormControl('123456', [Validators.required]),
        })
    }
    onSignup() {
        //console.log(this.form.value)
        const hornUser: HornUser = {
            name: this.form.value.userName,
            email: this.form.value.email,
            password: this.form.value.password
        }
        this.authService.signUp(hornUser);
    }
    onLogInWithGoogle() {
        this.authService.GoogleAuth();
    }
    signUpAsJackoboesGmail() {
        const hornUser: HornUser = {
            name: 'jackoboes@gmail',
            email: 'jackoboes@gmail.com',
            password: '123456'
        }
        this.authService.signUp(hornUser)
    }
    signUpAsJackoSchoonderwoerdYahoo() {
        const hornUser: HornUser = {
            name: 'jackoschoonderwoerd@yahoo',
            email: 'jackoschoonderwoerd@yahoo.nl',
            password: '123456'
        }
        this.authService.signUp(hornUser)
    }
}
