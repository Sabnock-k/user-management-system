import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login.component';
import { RegisterComponent } from './account/register.component';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent, // Ensure this is declared
        HomeComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }