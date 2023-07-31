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

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [
        CommonModule,
        MatTabsModule,
        // MyHornsComponent,
        SearchComponent
    ],
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    hornUser$: Observable<any>
    user: FirebaseUser

    constructor(
        private store: Store,
        private afAuth: Auth,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        const auth = getAuth()
        onAuthStateChanged(auth, (user: FirebaseUser) => {
            if (user) {
                this.user = user;
                this.hornUser$ = this.userService.getUser();
            }
        })
    }
}
