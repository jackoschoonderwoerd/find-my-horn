import { Injectable, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class UiService {

    constructor(
        private snackbar: MatSnackBar
    ) { }

    // openSnackbar(message: string) {
    //     this.snackbar.open(message, 'OK')
    // }

}
