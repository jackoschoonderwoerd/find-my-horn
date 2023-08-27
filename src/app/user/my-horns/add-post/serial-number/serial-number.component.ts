import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import * as ADD_POST from '../store/add-post.actions';
import * as fromRoot from './../../../../app.reducer';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SaxophoneSearchCriterea as SSC } from 'src/app/shared/models/saxophone.model';
import { AddHornState } from '../store/add-post.reducer';
import { PostsService } from 'src/app/saxophones/posts.service';
import { Post } from 'src/app/shared/models/post.model';

import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { take } from 'rxjs';
import { clearAll } from '../../../../app.reducer';

@Component({
    selector: 'app-serial-number',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule
    ],
    templateUrl: './serial-number.component.html',
    styleUrls: ['./serial-number.component.scss']
})
export class SerialNumberComponent implements OnInit {
    serialNumberForm: FormGroup;



    constructor(
        private fb: FormBuilder,
        private store: Store<fromRoot.State>,
        private dialogRefSerialNumberComponent: MatDialogRef<SerialNumberComponent>,
        private postsService: PostsService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.initSerialNumberForm()
    }
    initSerialNumberForm() {
        this.serialNumberForm = this.fb.group({
            serialNumber: new FormControl('123456', [Validators.required])
        })
    }
    onConfirmSerialNumber() {
        const serialNumber = this.serialNumberForm.value.serialNumber;
        this.store.dispatch(new ADD_POST.SetSerialNumber(serialNumber));
        this.store.select(fromRoot.getAddHornState).pipe(take(1)).subscribe((hornState: AddHornState) => {
            console.log(hornState);
            const scc: SSC = {
                brand: hornState.brand,
                saxType: hornState.saxType,
                serialNumber: serialNumber
            }
            this.postsService.checkForRegisteredSaxophone(scc).pipe(take(1)).subscribe((posts: Post[]) => {
                if (posts) {
                    console.log('saxophone already registered')
                    const dialogRef = this.dialog.open(ConfirmComponent, {
                        data: {
                            message: 'You are adding a post to an already registered saxophone. Do you wish to continue?'
                        }
                    });
                    dialogRef.afterClosed().subscribe((res: boolean) => {
                        if (res) {
                            this.closeDialog(true)
                        } else {
                            this.store.dispatch(new ADD_POST.AddPostToRegisteredSaxophone(false))
                            this.store.dispatch(new ADD_POST.ShowAddSaxophone(false))
                            this.store.dispatch(new ADD_POST.ClearAll())

                            this.closeDialog(false);
                        }
                    })
                    this.store.dispatch(new ADD_POST.AddPostToRegisteredSaxophone(true))
                } else {
                    console.log('saxophone not registered')
                }
            })
        })
        this.dialogRefSerialNumberComponent.close();
    }
    onCancel() {
        this.closeDialog(false)
    }

    closeDialog(status: boolean) {
        this.dialogRefSerialNumberComponent.close(status);
    }
}
