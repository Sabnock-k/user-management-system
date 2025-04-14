import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    account: any;

    constructor() { }

    ngOnInit(): void {
        // Retrieve user data from localStorage
        const user = localStorage.getItem('user');
        if (user) {
            this.account = JSON.parse(user);
        } else {
            // Redirect to login if no user is found
            window.location.href = '/index.html';
        }
    }
}