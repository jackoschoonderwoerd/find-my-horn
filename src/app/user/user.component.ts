import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { MatTabsModule } from '@angular/material/tabs';
// import { MyHornsComponent } from './my-horns/my-horns.component.tsXXX';
import { SearchComponent } from './search/search.component';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { User as FirebaseUser } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../auth/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DisplayNameComponent } from './display-name/display-name.component';

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [
        CommonModule,
        MatTabsModule,
        // MyHornsComponent,
        SearchComponent,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatDialogModule
    ],
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    displayNameForm: FormGroup
    hornUser$: Observable<any>
    user: FirebaseUser
    currentUser: any

    constructor(
        private store: Store,
        private afAuth: Auth,
        private userService: UserService,
        private authService: AuthService,
        private fb: FormBuilder,
        private dialog: MatDialog

    ) { }

    ngOnInit(): void {
        this.initDisplayNameForm();
        const auth = getAuth()
        if (auth.currentUser) {
            // console.log(auth.currentUser)
            this.displayNameForm.patchValue({
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                emailVerified: auth.currentUser.emailVerified
            })
        }
        onAuthStateChanged(auth, (user: FirebaseUser) => {
            if (user) {
                // console.log(user)
                this.user = user;
                this.hornUser$ = this.userService.getUser();
                this.displayNameForm.patchValue({
                    displayName: auth.currentUser.displayName,
                    email: auth.currentUser.email,
                    emailVerified: auth.currentUser.emailVerified
                })

            }
        })
    }
    initDisplayNameForm() {
        this.displayNameForm = this.fb.group({
            displayName: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required]),
            emailVerified: new FormControl(null, [Validators.required])
        })
    }
    onEditDisplayName() {
        // const displayName = this.displayNameForm.value.displayName
        const dialogRef = this.dialog.open(DisplayNameComponent, {
            data: {
                displayName: this.user.displayName
            }
        })
        dialogRef.afterClosed().subscribe((displayName: string) => {
            if (displayName) {
                this.authService.editDisplayName(displayName)
            }
        })
    }
}
