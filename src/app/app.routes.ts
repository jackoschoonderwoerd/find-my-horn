import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { UserComponent } from './user/user.component';

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
        path: 'user',
        loadComponent: () => import('./user/user.component').then(m => m.UserComponent)
    },
    {
        path: 'admin',
        loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent)
    },
    {
        path: '**', component: HomeComponent
    }
];
