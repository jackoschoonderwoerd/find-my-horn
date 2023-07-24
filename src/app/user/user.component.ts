import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { MatTabsModule } from '@angular/material/tabs';
import { MyHornsComponent } from './my-horns/my-horns.component';
import { SearchComponent } from './search/search.component';

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [CommonModule, MatTabsModule, MyHornsComponent, SearchComponent],
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    constructor(
        private store: Store
    ) { }

    ngOnInit(): void {
        this.store.subscribe((storeData: any) => {
            // //console.log(storeData)
        })
    }
}
