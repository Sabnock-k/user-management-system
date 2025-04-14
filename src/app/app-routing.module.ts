import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login.component';
import { RegisterComponent } from './account/register.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }, // Route for the registration page
    { path: 'home', component: HomeComponent }, // Route for the home page
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
    { path: '**', redirectTo: '/login' } // Fallback route
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }