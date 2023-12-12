import { Component } from '@angular/core';
import { UserService } from '../services/user.service'; // Replace with the actual path
import { Web5 } from "@web5/api";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  web5Variable!: any; // Declare web5Variable here
  didVariable!: string; // Declare didVariable here

  constructor(private userService: UserService) {}

  createUserOnClick() {
    // Call the createUser method when the button is clicked
    this.userService.createUserDid().subscribe(
      ({ web5, did }) => {
        // This block will be executed if the observable completes successfully
        console.log('User DID created:', did);
        // Now you can use web5 and did as needed
        this.web5Variable = web5;
        this.didVariable = did;
      },
      (error) => {
        // This block will be executed if there's an error in the observable
        console.error('Error creating user:', error);
      }
    );
  }
}
