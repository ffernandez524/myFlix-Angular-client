import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { ProfileUpdateFormComponent } from '../profile-update/profile-update-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  favMovies: any[] = [];
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getMovies();
  }

  updateDialog(): void {
    this.dialog.open(ProfileUpdateFormComponent, {
      width: '280px'
    });
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete your profile?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Account has been deleted', 'Ok', { duration: 2000 });
      });
    this.fetchApiData.deleteUser().subscribe((result) => {
      localStorage.clear();
    });
    }
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.favMovies = resp.filter((m: { _id: any }) => this.user.Favorites.indexOf(m._id) >= 0)
      return this.favMovies;
    });
  }
}
