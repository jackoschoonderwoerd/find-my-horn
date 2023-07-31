import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Auth } from '@angular/fire/auth';

@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [CommonModule, MatSidenavModule, MatListModule, MatIconModule],
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
    @Output() closeSidenav = new EventEmitter<void>

    constructor(
        private router: Router,
        private authService: AuthService,
        public afAuth: Auth

    ) { }

    onClose(direction) {
        if (direction === 'sign-out') {
            this.authService.logOut()
        } else {
            this.router.navigateByUrl(direction)
        }
        this.closeSidenav.emit()
    }
}
