import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { UserComponent } from './user/user.component';
import { TestComponent } from './test/test.component';
import { SearchComponent } from './user/search/search.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'sign-up', component: SignupComponent
    },
    {
        path: 'log-in', component: LoginComponent
    },
    {
        path: 'test', component: TestComponent
    },
    {
        path: 'search', component: SearchComponent
    },
    // {
    //     path: 'user',
    //     loadComponent: () => import('./user/user.component').then(m => m.UserComponent)
    // },
    {
        path: 'user', component: UserComponent
    },
    {
        path: 'admin',
        loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent)
    },
    {
        path: '**', component: HomeComponent
    }
];
