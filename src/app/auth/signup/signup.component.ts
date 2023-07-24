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
        private authService: AuthService,
        private store: Store<{ ui: fromRoot.State }>
    ) { }
    ngOnInit(): void {

        this.initForm()
        this.isLoading$ = this.store.select(fromRoot.getIsLoading)
    }
    initForm() {
        this.form = this.fb.group({

            email: new FormControl('jackoboes@gmail.com', [Validators.required]),
            password: new FormControl('123456', [Validators.required]),
        })
    }
    onSubmit() {
        //console.log(this.form.value)
        const hornUser: HornUser = {
            name: this.form.value.name,
            email: this.form.value.email,
            password: this.form.value.password
        }
        this.authService.signUp(hornUser);
    }
}
