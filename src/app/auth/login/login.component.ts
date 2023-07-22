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
        MatProgressSpinnerModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    isLoading$: Observable<boolean>

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit(): void {
        this.isLoading$ = this.store.select(fromRoot.getIsLoading)
        this.store.subscribe((data) => {
            console.log(data)
        })
        this.initForm()
    }
    initForm() {
        this.form = this.fb.group({
            email: new FormControl('jackoboes@gmail.com', [Validators.required]),
            password: new FormControl('123456', [Validators.required])
        })
    }
    onSubmit() {
        console.log(this.form.value)
        const hornUser: HornUser = {
            name: this.form.value.name,
            email: this.form.value.email,
            password: this.form.value.password
        }
        this.authService.logIn(hornUser);
    }
}
