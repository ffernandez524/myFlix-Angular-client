import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-update-form',
  templateUrl: './profile-update-form.component.html',
  styleUrls: ['./profile-update-form.component.scss']
})

export class ProfileUpdateFormComponent implements OnInit {

  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: ''
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ProfileUpdateFormComponent>,
    public snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
  }

  // Update user profile based on form data
  updateUser(): void {
    this.fetchApiData.updateUser(this.userData).subscribe((result) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close();
      localStorage.setItem("user", JSON.stringify(result));
      location.reload();
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
