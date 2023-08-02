// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  user: any = {};
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  // On load, get user data from local storage
  ngOnInit(): void {
    this.getMovies();
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  // Get list of movies from API
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  // Add movie to user's favorite list
  addFavorite(movieId: string): void {
    this.fetchApiData.addFavorite(movieId).subscribe((resp: any) => {
      this.user = resp;
      localStorage.setItem("user", JSON.stringify(resp));
    });
  }

  // Delete movie from user's favorite list
  deleteFavorite(movieId: string): void {
    this.fetchApiData.deleteFavorite(movieId).subscribe((resp: any) => {
      this.user = resp;
      localStorage.setItem("user", JSON.stringify(resp));
    });
  }

  // Open modal with genre description
  genreDialog(movie: any): void {
    this.dialog.open(MovieDialogComponent, {
      data: {
        title: movie.Genre.Title,
        description: movie.Genre.Description,
      }
    })
  }

  // Open modal with director description
  directorDialog(movie: any): void {
    this.dialog.open(MovieDialogComponent, {
      data: {
        title: movie.Director.Name,
        description: movie.Director.Bio
      }
    })
  }

  // Open modal with movie description
  synopsisDialog(movie: any): void {
    this.dialog.open(MovieDialogComponent, {
      data: {
        title: movie.Title,
        description: movie.Description
      }
    })
  }
}
