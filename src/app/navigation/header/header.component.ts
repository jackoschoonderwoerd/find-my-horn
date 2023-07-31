import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from './../../app.reducer'
import { Auth, User as FirebaseUser } from "@angular/fire/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { MatIconModule } from '@angular/material/icon';


@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, MatToolbarModule, RouterModule, MatIconModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    isLoggedIn$: Observable<boolean>;
    user$: Observable<FirebaseUser>;
    @Output() sidenavToggle = new EventEmitter<void>

    constructor(
        private authService: AuthService,

        private afAuth: Auth,
    ) {
    }

    ngOnInit(): void {
        onAuthStateChanged(this.afAuth, (user: FirebaseUser) => {
            if (user) {
                this.user$ = new Observable<FirebaseUser>((subcriber: any) => {
                    subcriber.next(user)
                })
            } else {
                this.user$ = null;
            }
        })
    }

    onSignOut() {
        this.authService.logOut();
    }

    onToggleSidenav() {
        console.log('showSidenav called');
        this.sidenavToggle.emit();
    }


    onUser() {
        // this.store.select(fromRoot.getUser).subscribe((user: FirebaseUser) => {
        //     if (!user) {
        //         this.router.navigateByUrl('log-in')
        //     } else {
        //         this.router.navigate(['/user', { uid: user.uid }])
        //     }
        // })
    }
}
